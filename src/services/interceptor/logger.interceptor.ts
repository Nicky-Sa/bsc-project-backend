import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '@/services/helper/colorize';
import { gregorianToPersian } from '@/services/functions';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body, path, uuid } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap((data) => {
        if (data?.data?.hasOwnProperty('password')) {
          delete data.data.password;
        } // password deleted here, and not shown in response actual body.
        Logger.info({
          request: { body, path, uuid, time: gregorianToPersian(now) },
          response: data,
        });
      }),
    );
  }
}
