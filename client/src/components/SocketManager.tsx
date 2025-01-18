import { useEffect } from "react";
import { io } from "socket.io-client";
import useUserStore, { User } from "../store";

interface SocketManagerProps {
  onJoinRoom: (roomId: string) => void;
}

export const socket = io("http://localhost:3001", {
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export const SocketManager: React.FC<SocketManagerProps> = ({ onJoinRoom }) => {
  const { setUsers } = useUserStore();

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }

    function onDisconnect() {
      console.log("Disconnected");
    }

    function onUsers(value: User[]) {
      setUsers(value);
    }

    function onUserJoined(roomId: string) {
      onJoinRoom(roomId);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("users", onUsers);
    socket.on("userJoined", onUserJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("users", onUsers);
      socket.off("userJoined", onUserJoined);
    };
  }, [setUsers, onJoinRoom]);

  return null;
};