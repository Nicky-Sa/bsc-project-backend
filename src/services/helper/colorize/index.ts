import * as clc from 'cli-color';

const log = console.log;

export class Logger {
  static success(message: any) {
    log(clc.green(message));
  }

  static error(message: any) {
    log(clc.red(message));
  }

  static warn(message: any) {
    log(clc.yellow(message));
  }

  static info(message: any) {
    log(message);
    log(
      clc.cyan(
        '-----------------------------------------------------------------------------',
      ),
    );
  }
}
