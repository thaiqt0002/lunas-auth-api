import { Global, Module } from '@nestjs/common'

import AppLoggerService from './service'

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export default class LoggerModule {}