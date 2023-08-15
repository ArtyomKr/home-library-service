import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggingService extends ConsoleLogger {
  error(args) {
    super.error(args);
  }

  warn(args) {
    super.warn(args);
  }

  log(args) {
    super.log(args);
  }

  logReq({ method, url, body, query }: Request) {
    process.stdout.write(
      `\x1b[34m>>>>>>>>>>>>>>> ${new Date().toISOString()}     [REQ] METHOD:${method} URL:${url} PARAMS:${JSON.stringify(
        query,
      )} BODY:${JSON.stringify(body)}\x1b[0m\n`,
    );
  }

  logRes({ statusCode, body }: { statusCode: number; body: object }) {
    process.stdout.write(
      `\x1b[36m<<<<<<<<<<<<<<< ${new Date().toISOString()}     [RESP] STATUS:${statusCode} BODY:${body}\x1b[0m\n`,
    );
  }
}
