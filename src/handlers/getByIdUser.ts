import { ServerResponse } from 'http';
import { getUser } from '../db';
import { StatusCodes } from '../constants';

export const getByIdUser = (res: ServerResponse, userId: string) => {
  res.writeHead(StatusCodes.OK);
  res.end(JSON.stringify(getUser(userId)));
};
