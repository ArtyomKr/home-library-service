import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.logReq(req);

    const send = res.send;
    res.send = (body) => {
      this.logger.logRes({ statusCode: res.statusCode, body });
      res.send = send;
      return res.send(body);
    };

    next();
  }
}
