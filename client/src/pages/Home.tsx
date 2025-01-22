import { Button } from "../components/ui/button";
import useRooms from "@/hooks/useRooms";

const Home = () => {
  const {
    availableRooms,
    roomId,
    setRoomId,
    password,
    setPassword,
    username,
    setUsername,
    createRoom,
    joinRoom,
  } = useRooms();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Room Management</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2"
      />
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
