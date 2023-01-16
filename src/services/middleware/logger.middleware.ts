import { NextFunction, Request, Response } from 'express';
import { Logger } from '../helper/colorize';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  Logger.log({ request, response });

  next();
}
