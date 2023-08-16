import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as process from 'process';
import { Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof Error ? exception.message : 'Unknown error';

    this.logger.error(exception);

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}

process
  .on('unhandledRejection', (reason, promise) => {
    const logger = new LoggingService();
    logger.error(reason, 'Unhandled Rejection at Promise', promise);
  })
  .on('uncaughtExceptionMonitor', (err) => {
    const logger = new LoggingService();
    logger.error(err, 'Uncaught Exception');
    process.exit(1);
  });
