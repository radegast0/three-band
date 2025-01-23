import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./components/Cube";
import { SocketManager } from "./components/SocketManager";
import { socket } from "./lib/socketClient";
import useUserStore from "./store";
import { useState } from "react";
import { User } from "@shared/User";
import Home from "./pages/Home";
import Experience from "./components/Experience";

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
        <Home />
      ) : (
        <div className="h-screen w-full">
          {/* <Canvas shadows camera={{ position: [1, 2, 3] }}>
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
          </Canvas> */}
          <Experience />
        </div>
      )}
    </>
  );
}
