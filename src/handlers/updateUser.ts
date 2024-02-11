import { IncomingMessage, ServerResponse } from 'http';
import { getUser, updateUser as updateUserDb } from '../db';
import { IUser } from '../models';
import { StatusCodes } from '../constants';

export const updateUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  let body: string = '';
  const user = getUser(userId);

  req
    .on('data', (chunk) => {
      body += chunk.toString();
    })
    .on('end', () => {
      const { username, age, hobbies }: Partial<IUser> = JSON.parse(body);

      const updatedUser = {
        id: user.id,
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      updateUserDb(user.id, updatedUser);

      res.writeHead(StatusCodes.OK);
      res.end(JSON.stringify(updatedUser));
    });
};
