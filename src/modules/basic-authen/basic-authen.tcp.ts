import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern } from '@nestjs/microservices'

import { ERole, IGoogleParams, ISignInParams, ISignUpParams } from '~/cores/interfaces'

import { BasicAuthGoogleCmd, BasicAuthSignInCmd, BasicAuthSignUpCmd } from './commands'
import { BasicAuthenRefreshQuery, BasicAuthenVerifyQuery, GetMeQuery } from './queries'

@Controller()
export class BasicAuthTcpController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {}

  @MessagePattern({ cmd: 'test' })
  test(data: any) {
    return data
  }

  @MessagePattern('get-me')
  async getMe(data: { uuid: string; role: ERole }) {
    return await this.query.execute(new GetMeQuery(data))
  }

  @MessagePattern('verify')
  async verify(data: { uuid: string; role: ERole }) {
    return await this.query.execute(new BasicAuthenVerifyQuery(data))
  }

  @MessagePattern('refresh-token')
  async refreshToken(data: { uuid: string; role: ERole }) {
    return await this.query.execute(new BasicAuthenRefreshQuery(data))
  }

  @MessagePattern('sign-in')
  async signIn(data: ISignInParams) {
    return await this.command.execute(new BasicAuthSignInCmd(data))
  }

  @MessagePattern('sign-up')
  async signUp(data: ISignUpParams) {
    return await this.command.execute(new BasicAuthSignUpCmd(data))
  }

  @MessagePattern('google')
  async google(data: IGoogleParams) {
    return await this.command.execute(new BasicAuthGoogleCmd(data))
  }
}
