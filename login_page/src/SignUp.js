// src/SignUp.js
import React, { useState } from 'react';
import './SignUp.css';

function SignUp(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      // 🧩 Send signup data to backend
      const response = await fetch("/api/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to connect to server");
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Welcome to HealthCare Plus!</h2>
        <p>Thank you for joining our healthcare community, <strong>{formData.firstName}</strong>.</p>
        <p>Your account has been created successfully. You can now sign in to access our healthcare services.</p>
        <button onClick={() => props.onSuccessfulSignup()} className="proceed-btn">
          Proceed to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="healthcare-container">
      <div className="header-section">
        <div className="medical-icon">⚕</div>
        <h1>HealthCare Plus</h1>
        <p>Join our healthcare community today</p>
      </div>

      <div className="signup-card">
        <h2>Patient Registration</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="name-group">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

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
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
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
              minLength="8"
              placeholder="At least 8 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              minLength="8"
              placeholder="Confirm your password"
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a> *
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Create Health Account
          </button>

          <div className="login-link">
            Already have an account? <a href="#login" onClick={(e) => { e.preventDefault(); props.onSuccessfulSignup(); }}>
              Sign in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
