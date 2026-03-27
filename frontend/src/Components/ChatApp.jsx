import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatRoomList from "./ChatRoomList";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import { api } from "../services/api";
import "./ChatApp.css";

const socket = io("http://localhost:5000"); // backend socket

const ChatApp = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  // Load rooms from backend
  const fetchRooms = async () => {
    const res = await api.get("/chatRooms");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
    // Listen real-time events
    socket.on("receiveMessage", (data) => {
      if (currentRoom && data.roomId === currentRoom._id) {
        setCurrentRoom(prev => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
      }
    });

    return () => socket.disconnect();
  }, [currentRoom]);

  const joinRoom = (room) => {
    if (currentRoom) socket.emit("leaveRoom", currentRoom._id);
    setCurrentRoom(room);
    socket.emit("joinRoom", room._id);
  };

  const addRoom = (room) => {
    setRooms(prev => [...prev, room]);
  };

  return (
    <div className="chat-app-container">
      <div className="sidebar">
        <CreateChatRoom onCreate={addRoom} />
        <ChatRoomList rooms={rooms} onSelect={joinRoom} currentRoom={currentRoom} />
      </div>
      <div className="chat-main">
        {currentRoom ? (
          <ChatRoom room={currentRoom} socket={socket} user={user} />
        ) : (
          <div className="no-room">Select a room to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;