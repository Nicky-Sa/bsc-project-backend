import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

export function addUuid(request: Request, response: Response, next: NextFunction) {
  request['uuid'] = uuidv4();
  next();
}
