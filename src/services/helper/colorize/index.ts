import * as clc from 'cli-color';

const log = console.log;

export class Logger {
  static success(message: any) {
    log(clc.green(message));
  }

  static error(message: any) {
    log(clc.cyan('Logger: '));
    log(clc.magentaBright(message));
    log(clc.cyan('-----------------------------------------------------------------------------'));
  }

  static warn(message: any) {
    log(clc.yellow(message));
  }

  static info(message: any) {
    log(clc.cyan('Logger: '));
    log(message);
    log(clc.cyan('-----------------------------------------------------------------------------'));
  }
}
