// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import HomePage from "./HomePage";

function App() {
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    setUser(null);
  };

  // ✅ Wrap main routes inside a component so we can use useNavigate
  const AppRoutes = () => {
    const navigate = useNavigate();

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />

        {/* ✅ Pass redirect function to SignUp */}
        <Route
          path="/signup"
          element={
            <SignUp
              onSuccessfulSignup={() => {
                navigate("/signin");
              }}
            />
          }
        />

        {/* ✅ Pass redirect + user setter to SignIn */}
        <Route
          path="/signin"
          element={
            <SignIn
              onSuccessfulLogin={(userData) => {
                setUser(userData);
                navigate("/home");
              }}
            />
          }
        />

        {/* ✅ HomePage now shows only if user exists */}
        <Route
          path="/home"
          element={
            user ? (
              <HomePage user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    );
  };

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
