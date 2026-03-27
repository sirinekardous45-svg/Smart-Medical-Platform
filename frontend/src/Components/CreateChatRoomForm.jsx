import React, { useState } from "react";
import { api } from "../services/api";
import "./CreateChatRoom.css";

const CreateChatRoom = ({ onCreate }) => {
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await api.post("/chatRooms", { name });
    onCreate(res.data);
    setName("");
  };

  return (
    <form className="create-room-form" onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="New room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateChatRoom;