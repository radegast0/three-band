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
}

const users: User[] = [];
const generateRandomPosition = (): [number, number, number] => {
  return [Math.random() * 3, 0, Math.random() * 3];
};
const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

io.on("connection", (socket) => {
  console.log("Connected");

  users.push({
    id: socket.id,
    position: generateRandomPosition(),
    color: generateRandomHexColor(),
  });

  socket.emit("hello");

  io.emit("users", users);

  socket.on("move", (position) => {
    const user = users.find(
      (user) => user.id === socket.id
    );
    user ? (user.position = position) : null;
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    users.splice(
      users.findIndex((user) => user.id === socket.id)
    );
    io.emit("users", users);
  });
});
