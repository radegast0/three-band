import { create } from "zustand";

export type User = {
  id: string;
  position: [number, number, number];
  color: string;
  roomId: string;
};

type Store = {
  users: User[];
  setUsers: (users: User[]) => void;
};

const useUserStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export default useUserStore;