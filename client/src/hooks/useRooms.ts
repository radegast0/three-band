import { useState, useEffect } from 'react';
import { socket } from '../lib/socketClient';
import { Room } from '@shared/Room';
import { User } from '@shared/User';

const useRooms = () => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit('getAvailableRooms');

    socket.on('availableRooms', (rooms) => {
      setAvailableRooms(rooms);
    });

    socket.on('roomUserCountUpdated', ({ roomId, userCount }) => {
      setAvailableRooms((prevRooms) => prevRooms.map((room) => (room.id === roomId ? { ...room, userCount } : room)));
    });

    socket.on('roomDeleted', (deletedRoomId) => {
      setAvailableRooms((prevRooms) => prevRooms.filter((room) => room.id !== deletedRoomId));
    });

    socket.on('users', (users: User[]) => {
      setRoomUsers(users);
      console.log(
        'users in room',
        users.map((user) => user.username)
      );
    });

    return () => {
      socket.off('roomDeleted');
      socket.off('availableRooms');
      socket.off('roomUserCountUpdated');
      socket.off('users');
    };
  }, []);

  const createRoom = () => {
    if (roomId) {
      socket.emit('createRoom', { roomId, password, username });
    }
  };

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId, password, username });
    setRoomId(roomId);
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomId });
    setRoomId('');
    setRoomUsers([]);
  };

  return {
    availableRooms,
    roomId,
    setRoomId,
    password,
    setPassword,
    username,
    setUsername,
    createRoom,
    joinRoom,
    roomUsers,
    leaveRoom,
  };
};

export default useRooms;
