import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '../helper/colorize';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { body, path, uuid } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap((data) =>
        Logger.log({
          request: { body, path, uuid, time: now },
          response: data,
        }),
      ),
    );
  }
}
