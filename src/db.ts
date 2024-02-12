import { IUser } from './models';

export let users: IUser[] = [];

export const getUser = (userId: string) => {
  return users.find(({ id }) => id === userId);
};

export const addUser = (user: IUser) => {
  users.push(user);
};

export const updateUser = (userId: string, updatedUser: IUser) => {
  users = users.map((user) => (user.id === userId ? updatedUser : user));
};

export const deleteUser = (userId: string) => {
  users = users.filter(({ id }) => id !== userId);
};
