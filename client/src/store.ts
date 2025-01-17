import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
};

type Store = {
  player: string;
  users: User[];
  setUsers: (users: User[]) => void;
};

const useUserStore = create<Store>((set) => ({
  player: "player",
  users: [],
  setUsers: (users) => set({ users }),
}));

export default useUserStore;