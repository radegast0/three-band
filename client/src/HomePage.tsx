import { useState, useEffect } from "react";
import { socket } from "./components/SocketManager";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  interface Room {
    id: string;
    userCount: number;
  }

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  useEffect(() => {
    socket.on("availableRooms", (rooms) => {
      setAvailableRooms(rooms);
    });

    return () => {
      socket.off("availableRooms");
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
      <button onClick={createRoom} className="bg-blue-500 text-white p-2 mb-2">
        Create Room
      </button>
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

export default HomePage;
