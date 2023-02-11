import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PersianErrors } from '../../../utils/persianTexts';
import { Logger } from '../helper/colorize';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let status: number;
    let message: string;
    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.getResponse()['message'];
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = PersianErrors.internalError;
    }
    Logger.error(error.stack);

    response.status(status).json({
      data: {},
      message: message,
      requestId: uuidv4(),
    });
  }
}
