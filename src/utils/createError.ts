import { ServerResponse } from 'http';
import { ErrorStatusTypes } from '../models';

export const createError = (
  res: ServerResponse,
  errorStatusType: ErrorStatusTypes,
  errorMessage: string
) => {
  res.writeHead(errorStatusType);
  res.end(JSON.stringify({ status: errorStatusType, errorMessage }));
};
