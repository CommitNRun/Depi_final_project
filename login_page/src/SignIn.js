// src/SignIn.js
import React, { useState } from "react";
import "./SignIn.css";

function SignIn(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Call the function passed from App.js to update user + redirect
        if (props.onSuccessfulLogin) {
          props.onSuccessfulLogin(data.user || { email: formData.email });
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="healthcare-container">
      <div className="header-section">
        <div className="medical-icon">⚕</div>
        <h1>HealthCare Plus</h1>
        <p>Welcome back to your healthcare portal</p>
      </div>

      <div className="signin-card">
        <h2>Patient Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="forgot-password">
            <a href="#forgot">Forgot your password?</a>
          </div>

          <button type="submit" className="submit-btn">
            Sign In to Your Account
          </button>

          <div className="signup-link">
            Don’t have an account?{" "}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/signup";
              }}
            >
              Create one here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
