import { StatusCodes } from '../constants';

type ServerErrorStatusTypes = StatusCodes.InternalServer;

type ClientErrorStatusTypes = StatusCodes.BadRequest | StatusCodes.NotFound;

export type ErrorStatusTypes = ServerErrorStatusTypes | ClientErrorStatusTypes;
