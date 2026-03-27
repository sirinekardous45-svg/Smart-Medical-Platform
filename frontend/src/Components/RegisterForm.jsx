import React, { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

const ChatRoom = ({ room, socket, user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", room._id);

    socket.on("receiveMessage", (data) => {
      if (data.roomId === room._id) setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", room._id);
      socket.off("receiveMessage");
    };
  }, [room, socket]);

  return (
    <div className="chat-room-container">
      <h2>{room.name}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === user.username ? "own" : ""}`}
          >
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <MessageForm socket={socket} roomId={room._id} user={user} />
    </div>
  );
};

export default ChatRoom;