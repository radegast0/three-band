import { create } from "zustand";
import { Store } from "@shared/Store";

const useUserStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  isSinglePlayer: false, // New state for single-player mode
  setIsSinglePlayer: (value: boolean) => set({ isSinglePlayer: value }), // Setter function
}));

export default useUserStore;
