import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Input } from '@heroui/react';
import Button from './Button';
import useRooms from '@/hooks/useRooms';
import useUserStore from '@/store';

const Draver = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { availableRooms, roomId, setRoomId, password, setPassword, username, setUsername, createRoom, joinRoom } =
    useRooms();
  const setIsSinglePlayer = useUserStore((state) => state.setIsSinglePlayer);

  return (
    <>
      <div className="flex gap-x-4 text-foreground dark">
        <Button
          onClick={() => setIsSinglePlayer(true)}
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
        >
          Solo Stage
        </Button>
        <Button
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
          onClick={onOpen}
        >
          Band Room
        </Button>
      </div>
      <Drawer
        className="bg-background text-foreground dark"
        radius="none"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Room Management</DrawerHeader>
              <DrawerBody>
                <Input type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="text" label="Room Name" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                <Input
                  type="password"
                  label="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={createRoom}>Create Room</Button>
                {availableRooms.length > 0 && <h2>Available Rooms:</h2>}
                <ul>
                  {availableRooms.map((room) => (
                    <li key={room.id}>
                      <span>
                        {room.id} ({room.userCount} Users: {room.users.map((user) => user.username).join(', ')})
                      </span>
                      <Button onClick={() => joinRoom(room.id)}>Join</Button>
                    </li>
                  ))}
                </ul>
              </DrawerBody>
              <DrawerFooter>
                <Button onClick={onClose}>Close</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Draver;
