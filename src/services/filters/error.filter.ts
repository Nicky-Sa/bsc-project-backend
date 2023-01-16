import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EnglishErrors } from '../../../utils/englishTexts';
import { Logger } from '../helper/colorize';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let status: number;
    let message: string;
    if (error instanceof HttpException) {
      status = error.getStatus();
      message = (error as HttpException).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = EnglishErrors.internalError;
    }
    Logger.error(error.stack);

    response.status(status).json({
      data: {},
      message: message,
      requestId: uuidv4(),
    });
  }
}
