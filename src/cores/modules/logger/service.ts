import { Injectable, Logger, LoggerService } from '@nestjs/common'

@Injectable()
export default class AppLoggerService implements LoggerService {
  private date = new Date().toLocaleString()

  private logger = new Logger('AppLoggerService')

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParameters: any[]) {
    return this.logger.log(`${this.date} - ${message}`, ...optionalParameters)
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParameters: any[]) {
    return this.logger.fatal(`${this.date} - ${message}`, ...optionalParameters)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParameters: any[]) {
    return this.logger.error(`${this.date} - ${message}`, ...optionalParameters)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParameters: any[]) {
    return this.logger.warn(`${this.date} - ${message}`, ...optionalParameters)
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParameters: any[]) {
    return this.logger.debug(`${this.date} - ${message}`, ...optionalParameters)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParameters: any[]) {
    return this.logger.verbose(`${this.date} - ${message}`, ...optionalParameters)
  }
}
