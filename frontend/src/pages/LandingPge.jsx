import React from "react";
import "./LandingPage.css";
import logo from "../logo.svg"; // أو استبدل باللوجو الطبي الخاص بك

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <img src={logo} alt="Chat Medical Logo" className="landing-logo" />
        <h1>Chat Medical</h1>
        <p>Connect with doctors and patients securely</p>
        <a href="/login" className="landing-button">Get Started</a>
      </div>
    </div>
  );
};

export default LandingPage;