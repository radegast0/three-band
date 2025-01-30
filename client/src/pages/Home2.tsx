import { Button } from "@/components/ui/button";
import useRooms from "@/hooks/useRooms";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";

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
  } = useRooms();

  return (
    <div className="h-screen bg-muted/10 p-6">
      <div className="mx-auto max-w-[320px]">
        <h1 className="mb-6 text-2xl font-bold">Three Band</h1>
        <div className="grid grid-cols-2 gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-32 w-full border-dashed"
              >
                <Plus className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create a new room</SheetTitle>
                <SheetDescription>
                  Create a new room to start jamming with others
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-md border bg-background px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Room Name"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="rounded-md border bg-background px-4 py-2"
                />
                <input
                  type="password"
                  placeholder="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md border bg-background px-4 py-2"
                />
                <Button onClick={createRoom}>Create Room</Button>
              </div>
            </SheetContent>
          </Sheet>

          {availableRooms.map((room) => (
            <Button
              key={room.id}
              variant="outline"
              className="h-32 w-full flex-col gap-2"
              onClick={() => joinRoom(room.id)}
            >
              <span className="text-sm font-medium">{room.id}</span>
              <span className="text-xs text-muted-foreground">
                {room.userCount} user{room.userCount !== 1 && "s"}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;