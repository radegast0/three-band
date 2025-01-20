import { create } from "zustand";
import { Store } from "@shared/Store";

const useUserStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export default useUserStore;
