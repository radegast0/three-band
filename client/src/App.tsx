import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./components/Cube";
import { socket, SocketManager } from "./components/SocketManager";
import useUserStore, { User } from "./store";
import { useState } from "react";
import HomePage from "./HomePage";

export default function App() {
  const users = useUserStore((state) => state.users);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const handleJoinRoom = (roomId: string) => {
    setCurrentRoom(roomId);
  };

  return (
    <>
      <SocketManager onJoinRoom={handleJoinRoom} />
      {!currentRoom ? (
        <HomePage />
      ) : (
        <div className="h-screen w-full">
          <Canvas shadows camera={{ position: [1, 2, 3] }}>
            <directionalLight castShadow position={[2, 5, 2]} intensity={0.5} />
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <mesh
              onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.5, 0]}
            >
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
            {users.map((user: User) => (
              <Cube key={user.id} position={user.position} color={user.color} />
            ))}
          </Canvas>
        </div>
      )}
    </>
  );
}