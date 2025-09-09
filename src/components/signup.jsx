import React, { useState } from "react";
import "../css/RegistrationForm.css";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Block numbers for name, city, address
    if (["name", "city", "address"].includes(name)) {
      if (/\d/.test(value)) return; // block typing numbers
    }

    // ✅ Prevent negative values for age & pincode
    if (["age", "pincode"].includes(name)) {
      if (value < 0) return; // block negative numbers
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendURL}user/signup`;

    // ✅ Extra validation
    if (!/^[A-Za-z\s]+$/.test(formData.name || "")) {
      return toast.error("Name must contain only letters");
    }
    if (!/^[A-Za-z\s]+$/.test(formData.city || "")) {
      return toast.error("City must contain only letters");
    }
  
    if (formData.age <= 0) {
      return toast.error("Age must be greater than 0");
    }
    if (formData.pincode <= 0) {
      return toast.error("Pincode must be greater than 0");
    }

    try {
      const response = await axios.post(api, formData);
      toast.success(response.data.msg);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email Address"
          required
        />

        <input
          type="number"
          name="age"
          onChange={handleChange}
          placeholder="Age"
          min="1" // ✅ HTML-level restriction
          required
        />

        <input
          type="text"
          name="city"
          onChange={handleChange}
          placeholder="City"
          required
        />

        <textarea
          name="address"
          onChange={handleChange}
          placeholder="Full Address"
          rows="3"
          required
        />

        <input
          type="number"
          name="pincode"
          onChange={handleChange}
          placeholder="Pincode"
          min="1" // ✅ HTML-level restriction
          required
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
