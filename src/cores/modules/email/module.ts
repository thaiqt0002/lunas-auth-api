import { Global, Module } from '@nestjs/common'

import EmailService from './service'

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export default class EmailModule {}
