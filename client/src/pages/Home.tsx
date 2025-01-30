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
    // roomUsers,
  } = useRooms();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Room Management</h1>
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Room Name"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
        />
        <Button className="w-full mb-4" onClick={createRoom}>
          Create Room
        </Button>
        {availableRooms.length > 0 && (
          <h2 className="text-xl font-semibold mb-4">Available Rooms:</h2>
        )}
        <ul className="space-y-2">
          {availableRooms.map((room) => (
            <li
              key={room.id}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
            >
              <span>
                {room.id} ({room.userCount} Users:{" "}
                {room.users.map((user) => user.username).join(", ")})
              </span>
              <Button variant="secondary" onClick={() => joinRoom(room.id)}>
                Join
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;