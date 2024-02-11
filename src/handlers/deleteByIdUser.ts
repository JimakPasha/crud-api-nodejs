import { ServerResponse } from 'http';
import { deleteUser } from '../db';

export const deleteByIdUser = (res: ServerResponse, userId: string) => {
  deleteUser(userId);
  res.writeHead(204);
  res.end();
}
