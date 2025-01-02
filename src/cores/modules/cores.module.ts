import { Global, Module } from '@nestjs/common'

import EmailModule from './email/module'
import HelperModule from './helper/module'
import LoggerModule from './logger/module'
import S3Module from './S3/S3.module'
import TokenModule from './token/module'

@Global()
@Module({
  imports: [S3Module, LoggerModule, HelperModule, EmailModule, TokenModule],
})
export default class CoresModule {}
