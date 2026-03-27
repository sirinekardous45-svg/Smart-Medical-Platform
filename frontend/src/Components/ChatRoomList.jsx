import React from "react";
import { Link } from "react-router-dom";

const rooms = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Pediatrics" },
];

function ChatRoomList() {
  return (
    <div>
      {rooms.map((room) => (
        <Link key={room.id} to={`/room/${room.id}`} className="chat-room">
          {room.name}
        </Link>
      ))}
    </div>
  );
}

export default ChatRoomList;