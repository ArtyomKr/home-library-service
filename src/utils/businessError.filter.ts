import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessError } from './businessError';
import { LoggingService } from '../logger/logger.service';

@Catch(BusinessError, BadRequestException)
export class BusinessErrorFilter implements ExceptionFilter {
  private readonly logger = new LoggingService();

  catch(exception: BusinessError | BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.debug(exception);

    if (exception instanceof BadRequestException) {
      response.status(status).json(exception.getResponse());
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        path: request.url,
      });
    }
  }
}
