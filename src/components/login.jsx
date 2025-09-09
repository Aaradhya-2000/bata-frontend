import React, { useState } from "react";
import axios from "axios";
import "../css/RegistrationForm.css";
import BackendURL from "../config/BackendURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ import styles

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendURL}user/login`;

    try {
      const response = await axios.post(api, formData);
      toast.success(response.data.msg); // ✅ toast instead of alert

      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("address", response.data.user.address);
      localStorage.setItem("city", response.data.user.city); // ✅ corrected "city" key
      localStorage.setItem("pincode", response.data.user.pincode); // ✅ corrected "city" key
      localStorage.setItem("token", response.data.Token);
      localStorage.setItem("userid", response.data.user._id);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed"); // ✅ error toast
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button">Login</button>
        <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
          Want to Sign up?
        </p>
      </form>
    </div>
  );
};

export default Login;
