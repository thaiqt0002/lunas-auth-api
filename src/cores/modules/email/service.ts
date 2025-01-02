import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import React from 'react'
import { Resend } from 'resend'

import { IConfig } from '~/cores/configs/interface'

import VerifyEmail from './_components/verify-basic-authen'
import { OtpEmail } from './_components/verify-email'

import ContactEmail from '~/emails/contact-email'

export abstract class IEmailService {
  public abstract sendEmail(to: string[], subject: string, text: string): Promise<void>
  public abstract templateEmailVerify(username: string, to: string[], token: string): Promise<void>
}

@Injectable()
export default class EmailService implements IEmailService {
  #resend!: Resend

  #resendEmail!: string

  constructor(configSerivce: ConfigService<IConfig>) {
    this.#resend = new Resend(configSerivce.get('RESEND_API_KEY'))
    this.#resendEmail = configSerivce.get('RESEND_SENDER')
  }

  public async sendEmail(to: string[], subject: string, react: React.ReactNode) {
    await this.#resend.emails.send({
      from: this.#resendEmail,
      to,
      subject,
      react,
    })
  }

  public async templateEmailVerify(username: string, to: string[], token: string) {
    const url = `https://dev.auth.lunas.vn/verify?token=${token}`
    const subject = 'Verify Email'
    const react = VerifyEmail({ username, url })
    await this.sendEmail(to, subject, react)
  }

  public async templateEmailOtp(to: string[], otp: string) {
    const react = OtpEmail({ otp })
    await this.sendEmail(to, 'OTP Email', react)
  }

  public async templateOTPEmail(to: string[], otp: string) {
    const subject = 'OTP Email'
    const text = `Your OTP code is: <b>${otp}</b>`
    await this.sendEmail(to, subject, text)
  }

  public async templateContactEmail(
    to: string[],
    data: {
      name: string
      email: string
      phoneNumber: string
      topic: string
      content: string
    },
  ) {
    const react = ContactEmail(data)
    await this.sendEmail(to, `Contact Store from ${data.name}`, react)
  }
}
