import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { hash } from 'bcrypt'

import { ENetwork } from '~/cores/constants'
import { ISignUpParams, Prettify } from '~/cores/interfaces'
import TokenService from '~/cores/modules/token/service'

import UserService from '~/modules/user/user.service'

import { SignUpParamsDto } from '../dtos/sign-up.dto'
import { SignUpEvent } from '../events/basic-authen.event'

export default class BasicAuthSignUpCmd extends SignUpParamsDto implements ICommand {
  constructor(options: Prettify<ISignUpParams>) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(BasicAuthSignUpCmd)
export class BasicAuthSignUpHlr implements ICommandHandler<BasicAuthSignUpCmd> {
  private readonly saltingRounds: number = 10
  private readonly verifyTokenOptions: any
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    // eslint-disable-next-line prefer-destructuring
    this.verifyTokenOptions = this.tokenService.verifyTokenOptions
  }
  async execute(cmd: ISignUpParams) {
    const { email, fullname, password } = cmd

    // Step 1: Hash the user password
    const hashedPassword = await this.hashPassword(password)

    // Step 2: Create user via UserService and get the payload
    const payload = await this.userService.create(ENetwork.BASIC, { email, fullname, hashedPassword })

    // Step 3: Generate a verification token
    const token = this.tokenService.generateToken(payload, this.verifyTokenOptions)

    // Step 4: Emit the event
    this.eventEmitter.emit('sign-up', new SignUpEvent(email, token))

    return true
  }

  private async hashPassword(pwd: string) {
    return await hash(pwd, this.saltingRounds)
  }
}
