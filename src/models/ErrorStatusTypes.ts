type ServerErrorStatusTypes = 500;

type ClientErrorStatusTypes = 400 | 404;

export type ErrorStatusTypes = ServerErrorStatusTypes | ClientErrorStatusTypes;
