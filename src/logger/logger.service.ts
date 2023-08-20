import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import { join, basename } from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly loglevel = +process.env.LOG_LEVEL ?? 0;

  writeLog({ error }: { error: boolean }, ...args) {
    const LOG_FOLDER = join(__dirname, '../../logs');

    if (!existsSync(LOG_FOLDER)) {
      mkdirSync(LOG_FOLDER);
    }
    const logFiles = readdirSync(LOG_FOLDER)
      .map((file) => basename(file))
      .filter((file) => file.includes(error ? 'error' : 'log'));
    let lastLog = logFiles.length
      ? logFiles[logFiles.length - 1]
      : error
      ? 'error.txt'
      : 'log.txt';
    const fileSize = logFiles.length
      ? statSync(join(LOG_FOLDER, lastLog)).size
      : 0;

    if (fileSize > +process.env.LOG_SIZE) {
      const [name, ext] = lastLog.split('.');
      const num = parseInt(
        (name.match(/\d+$/) as unknown as string | null) || '0',
      );
      lastLog = name.replace(/\d+$/, '') + (num + 1) + '.' + ext;
    }

    const writeStream = createWriteStream(join(LOG_FOLDER, lastLog), {
      flags: 'a',
    });
    writeStream.write(`${new Date().toISOString()} - ${args}\n`);
  }

  error(...args) {
    this.writeLog({ error: true }, ...args);
    super.error.apply(this, args);
  }

  warn(...args) {
    if (this.loglevel >= 1) {
      this.writeLog({ error: false }, ...args);
      super.warn.apply(this, args);
    }
  }

  log(...args) {
    if (this.loglevel >= 2) {
      this.writeLog({ error: false }, ...args);
      super.log.apply(this, args);
    }
  }

  debug(...args) {
    if (this.loglevel >= 3) {
      this.writeLog({ error: false }, ...args);
      super.debug.apply(this, args);
    }
  }

  verbose(...args) {
    if (this.loglevel >= 4) {
      this.writeLog({ error: false }, ...args);
      super.verbose.apply(this, args);
    }
  }

  logReq({ method, url, body, query }: Request) {
    const log = `>>>>>>>>>>> ${new Date().toISOString()}     [REQ] METHOD:${method} URL:${url} PARAMS:${JSON.stringify(
      query,
    )} BODY:${JSON.stringify(body)}`;
    this.verbose(`\x1b[34m${log}\x1b[0m`);
  }

  logRes({ statusCode, body }: { statusCode: number; body: object }) {
    const log = `<<<<<<<<<<< ${new Date().toISOString()}     [RESP] STATUS:${statusCode} BODY:${body}`;
    this.verbose(`\x1b[36m${log}\x1b[0m`);
  }
}
