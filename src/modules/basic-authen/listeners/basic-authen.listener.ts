import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import EmailService from '~/cores/modules/email/service'

import { SignUpEvent } from '../events/basic-authen.event'

@Injectable()
export class SignUpListener {
  constructor(private readonly emailService: EmailService) {}
  @OnEvent('sign-up')
  handlerSignUpEvent({ email, token }: SignUpEvent) {
    return this.emailService.templateEmailVerify('username', [email], token)
  }
}
