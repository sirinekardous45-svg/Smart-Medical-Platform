import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatRoomList({ socket, currentUser }) {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chatRooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const joinRoom = (roomId) => {
    socket.emit("joinRoom", { roomId, userId: currentUser._id });
  };

  const leaveRoom = (roomId) => {
    socket.emit("leaveRoom", { roomId, userId: currentUser._id });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name} ({room.users.length} users)
            <button onClick={() => joinRoom(room._id)}>Join</button>
            <button onClick={() => leaveRoom(room._id)}>Leave</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;