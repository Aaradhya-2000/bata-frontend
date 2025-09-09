import '../loginform.css'

import { useState } from "react";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const navigate = useNavigate();
  const [adminid, setAdminid] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    let api = `${BackendURL}admin/adminlogin`;
    try {
      const response = await axios.post(api, { adminid, password });
      toast.success(response.data.msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
      });
      localStorage.setItem("adminid",response.data.Admin.adminid)
      localStorage.setItem("admintoken",response.data.token)

      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-form">
        <h1 className="form-title">Admin Login</h1>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={adminid}
            onChange={(e) => setAdminid(e.target.value)}
            placeholder="Enter username"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="input-field"
          />
        </div>
        <button
          type="button"
          className="button submit-button"
          onClick={handleSubmit}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
