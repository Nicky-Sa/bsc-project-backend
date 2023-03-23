import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PersianErrors } from '@/utils/persianTexts.enum';
import { Logger } from '@/services/helper/colorize';
import { translate } from '@/utils/functions';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let status: number;
    let message: string;
    if (error instanceof HttpException) {
      status = error.getStatus();
      message = translate(error.getResponse()['message']);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = PersianErrors.internalError;
    }
    Logger.error(JSON.stringify({ status, message, stack: error.stack }, null, 4));

    response.status(status).json({
      data: {},
      message: message,
      requestId: uuidv4(),
    });
  }
}
