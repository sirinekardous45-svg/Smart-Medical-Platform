import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import "./ChatRoom.css";

const ChatRoom = ({ room, socket, user }) => {
  const [messages, setMessages] = useState(room.messages || []);
  const scrollRef = useRef();

  useEffect(() => {
    setMessages(room.messages || []);
  }, [room]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const messageData = {
      roomId: room._id,
      user: { _id: user._id, username: user.username },
      text,
      createdAt: new Date(),
    };
    socket.emit("sendMessage", messageData);
    setMessages(prev => [...prev, messageData]);
  };

  return (
    <div className="chat-room-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.user._id === user._id ? "me" : ""}`}>
            <strong>{msg.user.username}:</strong> {msg.text}
            <div className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <MessageForm onSend={sendMessage} />
    </div>
  );
};

export default ChatRoom;