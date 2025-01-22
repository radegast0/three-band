import { useEffect } from "react";
import { socket } from "@/lib/socketClient";
import useUserStore from "../store";
import { User } from "@shared/User";

interface SocketManagerProps {
  onJoinRoom: (roomId: string) => void;
}

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
      console.log("Users", value);
      setUsers(value);
    }

    function onUserJoined(roomId: string) {
      console.log("User joined", roomId);
      onJoinRoom(roomId);
    }

    socket.on("roomError", (errorMessage) => {
      console.error(errorMessage);
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("users", onUsers);
    socket.on("userJoined", onUserJoined);

    return () => {
      socket.off("roomError");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("users", onUsers);
      socket.off("userJoined", onUserJoined);
    };
  }, [setUsers, onJoinRoom]);

  return null;
};
