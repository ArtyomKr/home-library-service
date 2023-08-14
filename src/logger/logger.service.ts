import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  // error(message: any, stack?: string, context?: string) {
  //   console.log('Custom logger:')
  //   super.error(...arguments);
  // }

  error(args) {
    console.log('Custom logger:err');
    super.error(args);
  }

  warn(args) {
    console.log('Custom logger:warn');
    super.warn(args);
  }

  log(args) {
    console.log('Custom logger:log');
    super.log(args);
  }
}
