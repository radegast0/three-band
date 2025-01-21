import { useState, useEffect } from "react";
import { socket } from "../lib/socketClient";
import { Button } from "../components/ui/button";
import { Room } from "@shared/Room";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Request available rooms when the component mounts
    socket.emit("getAvailableRooms");

    // Listen for availableRooms event
    socket.on("availableRooms", (rooms) => {
      setAvailableRooms(rooms);
    });

    socket.on("roomUserCountUpdated", ({ roomId, userCount }) => {
      setAvailableRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, userCount } : room
        )
      );
    });

    socket.on("roomDeleted", (deletedRoomId) => {
      setAvailableRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== deletedRoomId)
      );
    });

    return () => {
      socket.off("availableRooms");
      socket.off("roomUserCountUpdated");
    };
  }, []);

  const createRoom = () => {
    if (roomId) {
      socket.emit("createRoom", { roomId, password });
    }
  };

  const joinRoom = (roomId: string) => {
    socket.emit("joinRoom", { roomId, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Room Management</h1>
      <input
        type="text"
        placeholder="Room Name"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
      />
      <Button onClick={createRoom}>Create Room</Button>
      <h2 className="text-xl mb-2">Available Rooms:</h2>
      <ul>
        {availableRooms.map((room) => (
          <li key={room.id} className="flex justify-between items-center mb-2">
            <span>
              {room.id} (Users: {room.userCount})
            </span>
            <button
              onClick={() => joinRoom(room.id)}
              className="bg-green-500 text-white p-1"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
