import { create } from 'zustand';
import { Store } from '@shared/Store';

const useUserStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  isSinglePlayer: false,
  setIsSinglePlayer: (value: boolean) => set({ isSinglePlayer: value }),
}));

export default useUserStore;
