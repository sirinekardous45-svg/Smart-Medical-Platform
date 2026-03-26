import React, { useState } from "react";

const MessageForm = ({ socket, roomId, username }) => {
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const messageData = { roomId, sender: username, text, timestamp: new Date() };
    socket.emit("sendMessage", messageData);
    setText("");
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;