import React from "react";
import { Link } from "react-router-dom";
import ChatRoomList from "./ChatRoomList";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Chat Rooms</h3>
      <ChatRoomList />
      <div style={{ marginTop: "20px" }}>
        <Link to="/profile">Profile</Link> <br />
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}

export default Sidebar;