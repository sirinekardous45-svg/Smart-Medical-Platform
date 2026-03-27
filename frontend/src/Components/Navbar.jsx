import React from "react";
import logo from "../logo.png"; // Logo medical

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Medical Logo" style={{ width: "40px" }} />
        Smart Medical
      </div>
      <div className="profile">
        <img src="https://i.pravatar.cc/40" alt="Profile" />
        <span>Dr. John Doe</span>
      </div>
    </div>
  );
}

export default Navbar;