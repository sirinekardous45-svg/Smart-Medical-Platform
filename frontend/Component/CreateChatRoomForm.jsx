import React, { useState } from "react";
import axios from "axios";

function CreateChatRoomForm({ onRoomCreated }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await axios.post("http://localhost:5000/api/chatRooms/create", { name });
      alert("Room created!");
      setName("");
      onRoomCreated(res.data); 
    } catch (err) {
      console.error(err);
      alert("Error creating room");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create Room</button>
    </form>
  );
}

export default CreateChatRoomForm;