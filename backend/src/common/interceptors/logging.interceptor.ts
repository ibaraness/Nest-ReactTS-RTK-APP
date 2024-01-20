import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        console.log(`Request: [${method}] ${url}, Body: ${JSON.stringify(body)}`);
        console.log(`Response: [${method}] Status: ${response.statusCode}, Body: ${JSON.stringify(data)}`);
      }),
    );
  }
}