import { Module } from '@nestjs/common'

import ContactController from './contact.controller'
import ContactService from './contact.service'
import SendEmailListener from './listeners/send-email.listener'

@Module({
  providers: [ContactService, SendEmailListener],
  controllers: [ContactController],
})
export default class ContactModule {}
