import React, { useState } from "react";
import "./SignUpLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    // ✅ Simple empty field validation
    if (!formData.email || !formData.password) {
      setMsg("⚠️ Please fill all details");
      return;
    }

    try {
      const res = await axios.post("https://bbuildmypc.onrender.com/login", formData,{ withCredentials: true });

      setMsg(res.data.message );
      if(res.data.message==="Login successful"){

        axios.get("https://bbuildmypc.onrender.com/prepareHistory",{ withCredentials: true })
        .then(res=>{console.log("done")})
        .catch(error=>{console.log(error)})

        navigate("/")
        setTimeout(() => window.location.reload(), 0);
      }
      

      // Clear form on success
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

          <button type="submit" className="btn">Login</button>
        </form>
        {msg ? <p>{msg}</p> : <p>Don’t have an account? <a href="/signup">Sign Up</a></p>}
      </div>
    </div>
  );
}

export default LoginForm;
