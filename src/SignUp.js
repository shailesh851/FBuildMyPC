import React, { useEffect, useState } from "react";
import "./SignUpLogin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SignupForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    csrfToken: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setmsg] = useState("");




const handleChange = (e) => {
  const { name, value } = e.target;

  // Cookies में value save करना
  if (name === "name") {
    document.cookie = `UserName=${value}`;
  }
  if (name === "email") {
    document.cookie = `UserEmail=${value}`;
  }


  // CSRF token निकालने का helper


  // अब सिर्फ एक बार setFormData कॉल करना है
  setFormData({
    ...formData,
    [name]: value
  });
};

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-z][a-z0-9._]*@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*()_+).";
    }
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
      const res = await axios.post("https://bbuildmypc.onrender.com/signup", formData, { withCredentials: true });

      console.log("✅ Data inserted:", res.data);
      setmsg(res.data.message);
      if(res.data.message==="Signup successful"){
        axios.get("https://bbuildmypc.onrender.com/prepareHistory",{ withCredentials: true })
        .then(res=>{console.log("done")})
        .catch(error=>{console.log(error)})
        navigate("/")
        setTimeout(() => window.location.reload(), 0);
      }

      // ✅ Clear form ONLY if signup is successful
      if (res.status === 201) {
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      if (error.response) {
        // Show backend message (e.g. "User already registered")
        setmsg(error.response.data.message);
      } else {
        setmsg("❌ Server error, please try again later");
      }
      // ❌ Do not clear form on error
    }
  }
};


    useEffect(() => {
      axios.get("https://bbuildmypc.onrender.com/get-csrf", { withCredentials: true })
      .then(res => {
      setFormData(prev => ({ ...prev, csrfToken: res.data.csrfToken }));
    })
    .catch(err => console.error("CSRF fetch error:", err));
    }, []);

  return (
    
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={formData.name}
              onChange={handleChange}
              className="input-box"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-box"
            />
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>
        {msg? <p>{msg}</p>:<p>Already have an account? <a href="/login"> Login</a></p>}
      </div>
    </div>
  );
}

export default SignupForm;
  