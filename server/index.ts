import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3001);

interface User {
  id: string;
  position: [number, number, number];
  color: string;
  roomId: string;
}

const users = new Map<string, User>();
const rooms = new Map();

const generateRandomPosition = (): [number, number, number] => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.emit(
    "availableRooms",
    Array.from(rooms.entries()).map(([id, room]) => ({
      id,
      userCount: room.users.size,
      hasPassword: !!room.password,
    }))
  );

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

    io.emit(
      "availableRooms",
      Array.from(rooms.entries()).map(([id, room]) => ({
        id,
        userCount: room.users.size,
        hasPassword: !!room.password,
      }))
    );

    const roomUsers = Array.from(users.values()).filter(
      (user) => user.roomId === roomId
    );
    io.to(roomId).emit("users", roomUsers);
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

    const roomUsers = Array.from(users.values()).filter(
      (user) => user.roomId === roomId
    );
    io.to(roomId).emit("users", roomUsers);
    socket.emit("userJoined", roomId);
  });

  socket.on("move", (position: [number, number, number]) => {
    const user = users.get(socket.id);
    if (user) {
      user.position = position;
      const roomUsers = Array.from(users.values()).filter(
        (u) => u.roomId === user.roomId
      );
      io.to(user.roomId).emit("users", roomUsers);
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
        }
      }
      users.delete(socket.id);
      const roomUsers = Array.from(users.values()).filter(
        (u) => u.roomId === user.roomId
      );
      io.to(user.roomId).emit("users", roomUsers);
      console.log("Disconnected:", socket.id);
    }
  });
});
