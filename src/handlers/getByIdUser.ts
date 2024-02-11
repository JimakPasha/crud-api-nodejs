import { ServerResponse } from 'http';
import { getUser } from '../db';

export const getByIdUser = (res: ServerResponse, userId: string) => {
  res.writeHead(200);
  res.end(JSON.stringify(getUser(userId)));
}
