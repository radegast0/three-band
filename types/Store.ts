import { User } from "./User";

export type Store = {
  users: User[];
  setUsers: (users: User[]) => void;
  isSinglePlayer: boolean;
  setIsSinglePlayer: (value: boolean) => void;
};