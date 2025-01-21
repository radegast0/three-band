import { Server } from "socket.io";
import { User } from "../types/User";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3001);

const users = new Map<string, User>();
const rooms = new Map();

const generateRandomPosition = (): [number, number, number] => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const getAvailableRooms = () =>
  Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    userCount: room.users.size,
    hasPassword: !!room.password,
  }));

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  socket.emit("availableRooms", getAvailableRooms());
  socket.on("getAvailableRooms", () => {
    socket.emit("availableRooms", getAvailableRooms());
  });

  const updateRoomUserCount = (roomId: string) => {
    const room = rooms.get(roomId);
    if (room) {
      io.emit("roomUserCountUpdated", {
        roomId,
        userCount: room.users.size,
      });
    }
  };

  socket.on("createRoom", ({ roomId, password }) => {
    rooms.set(roomId, {
      users: new Set(),
      password: password || null,
    });
    socket.join(roomId);
    rooms.get(roomId).users.add(socket.id);

    users.set(socket.id, {
      id: socket.id,
      position: generateRandomPosition(),
      color: generateRandomHexColor(),
      roomId,
    });

    io.emit("availableRooms", getAvailableRooms());
    updateRoomUserCount(roomId);

    emitRoomUsers(roomId);
    socket.emit("userJoined", roomId);
  });

  socket.on("joinRoom", ({ roomId, password }) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit("roomError", "Room not found");
      return;
    }
    if (room.password && room.password !== password) {
      socket.emit("roomError", "Incorrect password");
      return;
    }

    socket.join(roomId);
    room.users.add(socket.id);

    users.set(socket.id, {
      id: socket.id,
      position: generateRandomPosition(),
      color: generateRandomHexColor(),
      roomId,
    });

    updateRoomUserCount(roomId);

    emitRoomUsers(roomId);
    socket.emit("userJoined", roomId);
  });

  const emitRoomUsers = (roomId: string) => {
    const roomUsers = Array.from(users.values()).filter(
      (user) => user.roomId === roomId
    );
    io.to(roomId).emit("users", roomUsers);
  };

  socket.on("move", (position: [number, number, number]) => {
    const user = users.get(socket.id);
    if (user) {
      user.position = position;
      emitRoomUsers(user.roomId);
    }
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      const room = rooms.get(user.roomId);
      if (room) {
        room.users.delete(socket.id);
        if (room.users.size === 0) {
          rooms.delete(user.roomId);
          io.emit("roomDeleted", user.roomId);
        } else {
          updateRoomUserCount(user.roomId);
        }
      }
      users.delete(socket.id);
      emitRoomUsers(user.roomId);
      console.log("Disconnected:", socket.id);
    }
  });
});
