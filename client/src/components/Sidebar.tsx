import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useRooms from '@/hooks/useRooms';
import { Input } from '@/components/ui/input';
import useUserStore from '@/store';

export default function Sidebar() {
  const { availableRooms, roomId, setRoomId, password, setPassword, username, setUsername, createRoom, joinRoom } =
    useRooms();

  const setIsSinglePlayer = useUserStore((state) => state.setIsSinglePlayer);

  return (
    <div className="fixed left-0 top-0 z-10">
      <div className="flex w-96 flex-col">
        <Button onClick={() => setIsSinglePlayer(true)} className="m-2 bg-transparent p-12" variant="outline">
          Single Play
        </Button>
        <Sheet defaultOpen={false}>
          <SheetTrigger className="focus-visible:ring-0" asChild>
            <Button className="m-2 bg-transparent p-12" variant="outline">
              Create or Join Room
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Room Management</SheetTitle>
              <SheetDescription>Create a new room or join an existing one.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input type="text" placeholder="Room Name" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
              <Input
                type="password"
                placeholder="Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" onClick={createRoom}>
                Create Room
              </Button>
            </div>
            {availableRooms.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Available Rooms:</h2>
                <ul className="mt-2 space-y-2">
                  {availableRooms.map((room) => (
                    <li key={room.id} className="flex items-center justify-between">
                      <span>
                        {room.id} ({room.userCount} Users: {room.users.map((user) => user.username).join(', ')})
                      </span>
                      <Button variant="secondary" onClick={() => joinRoom(room.id)}>
                        Join
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
