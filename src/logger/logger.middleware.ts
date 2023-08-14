import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggingService();
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path: url, body, query } = req;
    this.logger.debug(
      `METHOD:${method} 
       URL:${url} 
       PARAMS:${JSON.stringify(query)} 
       BODY:${JSON.stringify(body)}`,
    );
    next();
  }
}
