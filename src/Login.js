import React, { useState } from "react";
import "./SignUpLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [forgotdetail, setForgotdetail] = useState(false);
  const [otp, setOtp] = useState("");
  const [formOtp, setFormOtp] = useState("");
  const [formNewPassword, setFormNewPassword] = useState("");

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMsg("⚠️ Please fill all details");
      return;
    }

    try {
      const res = await axios.post(
        "https://bbuildmypc.onrender.com/login",
        formData,
        { withCredentials: true }
      );

      setMsg(res.data.message);

      if (res.data.message === "Login successful") {
        await axios.get("https://bbuildmypc.onrender.com/prepareHistory", {
          withCredentials: true,
        });

        navigate("/");
        setTimeout(() => window.location.reload(), 0);
      }

      if (res.status === 200) {
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message || "Login failed");
      } else {
        setMsg("❌ Server error, please try again later");
      }
    }
  };

  // ✅ Forgot Password: Send OTP
  async function Forgotdet(e) {
    e.preventDefault();
    if (!formData.email) {
      alert("⚠️ Please enter your email first");
      return;
    }

    try {
      const res = await axios.post(
        "https://bbuildmypc.onrender.com/forgotdetails",
        { user: formData.email },
        { withCredentials: true }
      );

      if (res.data.otp) {
        setOtp(res.data.otp);
        setForgotdetail(true);
        alert("✅ OTP sent to your email " +formData.email);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "❌ Error sending OTP");
    }
  }

  // ✅ Submit new password
  async function Detailsforgot(e) {
    e.preventDefault();

    if (otp.toString() !== formOtp.toString()) {
      alert("❌ Invalid OTP");
      return;
    }

    if (!formNewPassword) {
      alert("⚠️ Please enter your new password");
      return;
    }

    try {
      const res = await axios.post(
        "https://bbuildmypc.onrender.com/passwordchange",
        {
          otp: formOtp,
          newPassword: formNewPassword,
          user: formData.email,
        },
        { withCredentials: true }
      );

      alert("✅ Password changed successfully!");
      setForgotdetail(false);
      setFormNewPassword("");
      setFormOtp("");
    } catch (error) {
      alert("❌ Password change failed. Try again later.");
    }
  }

  // ✅ JSX structure
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-box"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-box"
            />
          </div>
          {!forgotdetail ? (
            <a className="forgotbutton" onClick={Forgotdet} href="#">
              Forgot password?
            </a>

          
          ) : (<h1></h1>)}
          {!forgotdetail ?(
                      <button type="submit" className="btn">
            Login
          </button>
          ):(<h1></h1>)

          }

        </form>

          {/* Forgot Password Section */}
          {!forgotdetail ? (
            <h1></h1>

          
          ) : (
            <div className="forgotdetails">
              <form onSubmit={Detailsforgot}>
                <table>
                  <tbody>
                    <tr>
                      <td>OTP:</td>
                      <td>
                        <input
                          type="text"
                          value={formOtp}
                          onChange={(e) => setFormOtp(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>New Password:</td>
                      <td>
                        <input
                          type="password"
                          value={formNewPassword}
                          onChange={(e) =>
                            setFormNewPassword(e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <button type="submit">Submit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          )}

          

        {msg ? (
          <p>{msg}</p>
        ) : (
          <p>
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
