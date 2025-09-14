import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {
  log(message: string) {
    super.log(`🟢 ${message}`);
  }

  error(message: string, trace?: string) {
    super.error(`🔴 ${message}`, trace);
  }

  warn(message: string) {
    super.warn(`🟠 ${message}`);
  }
}
