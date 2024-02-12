import { IUser } from '../models';

export const mockUser: Omit<IUser, 'id'> = {
  username: 'Test user',
  age: 18,
  hobbies: ['sport'],
};

export const mockupdatedUser: Omit<IUser, 'id'> = {
  username: 'Test updated user',
  age: 20,
  hobbies: ['music'],
};
