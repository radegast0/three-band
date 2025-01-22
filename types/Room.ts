export type Room = {
  id: string;
  userCount: number;
  users: { username: string }[];
  hasPassword: boolean;
};
