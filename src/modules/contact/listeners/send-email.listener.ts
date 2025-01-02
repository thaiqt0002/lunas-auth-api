import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import EmailService from '~/cores/modules/email/service'

import SendEmailContactEvent from '../events/send-email.event'

@Injectable()
export default class SendEmailListener {
  constructor(private readonly emailService: EmailService) {}
  @OnEvent('send-contact-email')
  handlerSendEmailEvent({ name, email, phoneNumber, topic, content }: SendEmailContactEvent) {
    return this.emailService.templateContactEmail([email], {
      name,
      email,
      phoneNumber,
      topic,
      content,
    })
  }
}
