import React, { useState } from "react";
import io from "socket.io-client";
import CreateChatRoomForm from "./CreateChatRoomForm";
import ChatRoomList from "./ChatRoomList";

const socket = io("http://localhost:5000");

function ChatApp({ currentUser }) {
  const [rooms, setRooms] = useState([]);

  const handleRoomCreated = (newRoom) => {
    setRooms((prev) => [...prev, newRoom]);
  };

  return (
    <div>
      <h1>Smart Medical Chat</h1>
      <CreateChatRoomForm onRoomCreated={handleRoomCreated} />
      <ChatRoomList socket={socket} currentUser={currentUser} />
    </div>
  );
}

export default ChatApp;