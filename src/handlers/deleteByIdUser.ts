import { ServerResponse } from 'http';
import { deleteUser } from '../db';
import { StatusCodes } from '../constants';

export const deleteByIdUser = (res: ServerResponse, userId: string) => {
  deleteUser(userId);
  res.writeHead(StatusCodes.NoContent);
  res.end();
}
