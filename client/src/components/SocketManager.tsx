import { useEffect } from "react";
import { io } from "socket.io-client";
import useUserStore from "../store";

export const socket = io("http://localhost:3001");

export const SocketManager = () => {
  const { setUsers } = useUserStore();
  useEffect(() => {
    function onConnect() {
      console.log("Connected");
      socket.emit("hello");
    }
    function onDisconnect() {
      console.log("Disconnected");
    }

    function onHello() {
      console.log("Received hello");
    }

    function onUsers(value: any) {
      setUsers(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("users", onUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
    };
  }, []);
  return null;
};
