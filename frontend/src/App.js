// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

// === Landing Page ===
const LandingPage = ({ onStart }) => (
  <div className="landing-page">
    <div className="landing-overlay">
      <h1>Smart Medical Chat</h1>
      <p>Connect with doctors & patients seamlessly</p>
      <button className="start-btn" onClick={onStart}>
        Get Started
      </button>
    </div>
  </div>
);

// === Forms ===
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onRegister(username.trim());
  };
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// === Chat Components ===
const MessageForm = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

const ChatRoom = ({ room, username, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!room) return;
    socket.emit("joinRoom", room.id);

    socket.on("receiveMessage", (data) => {
      if (data.roomId === room.id) setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", room.id);
      socket.off("receiveMessage");
    };
  }, [room, socket]);

  const handleSend = (text) => {
    const data = { roomId: room.id, username, text, timestamp: new Date() };
    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
  };

  if (!room) return <div className="no-room">Select a room to chat</div>;

  return (
    <div className="chat-room">
      <div className="chat-header">
        <img
          src={room.avatar || "https://i.pravatar.cc/40?img=1"}
          alt="room avatar"
          className="room-avatar"
        />
        <h3>{room.name}</h3>
        <span className="room-badge">{room.unread || 0}</span>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.username === username ? "me" : "other"}`}
          >
            <img
              src={`https://i.pravatar.cc/40?u=${msg.username}`}
              alt={msg.username}
              className="msg-avatar"
            />
            <div className="msg-content">
              <span className="msg-user">{msg.username}</span>
              <span className="msg-text">{msg.text}</span>
              <span className="msg-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <MessageForm onSend={handleSend} />
    </div>
  );
};

const ChatApp = ({ username }) => {
  const [rooms, setRooms] = useState([
    { id: "1", name: "General", icon: "🩺", avatar: "https://i.pravatar.cc/100?img=10", unread: 0 },
    { id: "2", name: "Doctors", icon: "👨‍⚕️", avatar: "https://i.pravatar.cc/100?img=20", unread: 0 },
    { id: "3", name: "Patients", icon: "👩‍⚕️", avatar: "https://i.pravatar.cc/100?img=30", unread: 0 },
  ]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket] = useState(() => io("http://localhost:5000"));

  const handleCreateRoom = (name) => {
    const newRoom = {
      id: Date.now().toString(),
      name,
      icon: "💬",
      avatar: `https://i.pravatar.cc/100?u=${Date.now()}`,
      unread: 0,
    };
    setRooms((prev) => [...prev, newRoom]);
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <div className="sidebar-header">Rooms</div>
        <form
          className="create-room-form"
          onSubmit={(e) => {
            e.preventDefault();
            const roomName = e.target.elements.roomName.value;
            if (roomName.trim()) {
              handleCreateRoom(roomName.trim());
              e.target.reset();
            }
          }}
        >
          <input type="text" name="roomName" placeholder="New room..." />
          <button type="submit">+</button>
        </form>
        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`room-item ${
                currentRoom?.id === room.id ? "active" : ""
              }`}
              onClick={() => setCurrentRoom(room)}
            >
              <img src={room.avatar} alt={room.name} className="room-avatar" />
              <span className="room-name">{room.name}</span>
              {room.unread > 0 && <span className="room-badge">{room.unread}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-main">
        <ChatRoom room={currentRoom} username={username} socket={socket} />
      </div>
    </div>
  );
};

// === Main App ===
function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const handleStart = () => setShowLanding(false);

  return (
    <div className="App">
      {showLanding ? (
        <LandingPage onStart={handleStart} />
      ) : !user ? (
        isRegister ? (
          <RegisterForm onRegister={setUser} />
        ) : (
          <LoginForm onLogin={setUser} />
        )
      ) : (
        <ChatApp username={user} />
      )}

      {!user && !showLanding && (
        <div className="toggle-login-register">
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      )}

      <footer className="app-footer">
        Smart Medical Chat © 2026
      </footer>
    </div>
  );
}

export default App;