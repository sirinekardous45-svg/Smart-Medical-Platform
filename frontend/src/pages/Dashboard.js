import React from "react";
import ChatApp from "../Components/ChatApp";

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h1>Welcome, {user.username}</h1>
      <ChatApp user={user} />
    </div>
  );
};

export default Dashboard;