import { yellow, magenta, red, gray, green } from 'colors';

import { ILogger } from './ILogger';

class Logger implements ILogger {
  info(message: string): void {
    console.log(`${green('[INFO]')} ${this.time} ${message}`);
  }
  error(message: string): void {
    console.log(`${red('[ERROR]')} ${this.time} ${message}`);
  }
  debug(message: string): void {
    console.log(`${magenta('[DEBUG]')} ${this.time} ${message}`);
  }
  warn(message: string): void {
    console.log(`${yellow('[WARN]')} ${this.time} ${message}`);
  }

  private get time() {
    return gray(`${new Date().toLocaleString()}`);
  }
}

export { Logger };
