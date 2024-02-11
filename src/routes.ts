import { IncomingMessage, ServerResponse } from 'http';
import * as uuid from 'uuid';
import { getUser } from './db';
import { deleteByIdUser, getAllUsers, getByIdUser, addUser, updateUser } from './handlers';
import { createError } from './utils';
import { errorMessages, StatusCodes, USERS_URL } from './constants';

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method, url } = req;
    res.setHeader('Content-Type', 'application/json');
    
    if (url === USERS_URL) {
      switch (method) {
        case 'GET':
          getAllUsers(res);
          break;
        case 'POST':
          addUser(req, res);
          break;
      }
      return;
    }
  
    if (url?.startsWith(`${USERS_URL}/`)) {
      const userId = url.split('/').at(-1);
  
      if (!userId || !uuid.validate(userId)) {
        createError(res, StatusCodes.BadRequest, errorMessages.errorUuid);
        return;
      }
  
      const user = getUser(userId);
  
      if (!user) {
        createError(res, StatusCodes.NotFound, errorMessages.userNotFound);
      } else {
        switch (method) {
          case 'GET':
            getByIdUser(res, userId);
            break;
          case 'PUT':
            updateUser(req, res, userId);
            break;
          case 'DELETE':
            deleteByIdUser(res, userId);
          break;
        }
      }
  
      return;
    }
    createError(res, StatusCodes.NotFound, errorMessages.notFoundUrl(url));
  } catch {
    createError(res, StatusCodes.InternalServer, errorMessages.internalServer);
  }
}
