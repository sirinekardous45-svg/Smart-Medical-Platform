import React, { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

const ChatRoom = ({ socket, roomId, username }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage");
    };
  }, [socket, roomId]);

  return (
    <div>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}</strong>: {msg.text} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
          </div>
        ))}
      </div>
      <MessageForm socket={socket} roomId={roomId} username={username} />
    </div>
  );
};

export default ChatRoom;