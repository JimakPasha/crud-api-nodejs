import { IncomingMessage, ServerResponse } from 'http';
import * as uuid from 'uuid';
import { addUser as addUserDb } from '../db';
import { createError } from '../utils';
import { errorMessages, StatusCodes } from '../constants';
import { IUser } from '../models';

export const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let body: string = '';

  req
    .on('data', (chunk) => {
      body += chunk.toString();
    })
    .on('end', () => {
      const { username, age, hobbies }: Omit<IUser, 'id'> = JSON.parse(body);

      if (!username || !age || !hobbies) {
        createError(res, StatusCodes.BadRequest, errorMessages.requireFields);
      } else {
        const newUser = {
          id: uuid.v4(),
          username,
          age,
          hobbies,
        };
        addUserDb(newUser);

        res.writeHead(StatusCodes.SuccesRequest);
        res.end(JSON.stringify(newUser));
      }
    });
};
