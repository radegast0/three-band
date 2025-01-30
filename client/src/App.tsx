import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cube from './components/Cube';
import { SocketManager } from './components/SocketManager';
import { socket } from './lib/socketClient';
import useUserStore from './store';
import { useState } from 'react';
import { User } from '@shared/User';
import Home from './pages/Home';
import Experience from './components/Experience';
import Home2 from './pages/Home2';

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
        // <Home />
        <>
          <Home2 />
        </>
      ) : (
        <div className="h-screen w-full">
          <Experience />
        </div>
      )}
    </>
  );
}
