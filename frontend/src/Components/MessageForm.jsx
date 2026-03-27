import React, { useState } from "react";
import "./MessageForm.css";

const MessageForm = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="message-form" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;