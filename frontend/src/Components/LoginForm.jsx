import React, { useState } from "react";
import "./LoginFormPro.css";
import { FaUserAlt } from "react-icons/fa"; // user icon

const LoginFormPro = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  };

  return (
    <div className="login-pro-container">
      <h1>Medical Chat</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <FaUserAlt
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#0077ff"
            }}
          />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ paddingLeft: "35px" }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="switch-mode">
        <span>Don't have an account? </span>
        <button onClick={onSwitch}>Register</button>
      </div>
    </div>
  );
};

export default LoginFormPro;