import { ServerResponse } from 'http';
import { users } from '../db';
import { StatusCodes } from '../constants';

export const getAllUsers = (res: ServerResponse) => {
  res.writeHead(StatusCodes.OK);
  res.end(JSON.stringify(users));
};
