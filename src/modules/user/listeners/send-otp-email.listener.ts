import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import EmailService from '~/cores/modules/email/service'

@Injectable()
export class SendOtpEmailListener {
  constructor(private readonly emailService: EmailService) {}
  @OnEvent('send-otp-email')
  handlerSendOtpEmailEvent({ email, otp }) {
    return this.emailService.templateOTPEmail([email], otp)
  }
}
