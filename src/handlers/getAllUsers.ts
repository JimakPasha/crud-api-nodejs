import { ServerResponse } from 'http';
import { users } from '../db';

export const getAllUsers = (res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify(users));
}
