import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { ENetwork } from '~/cores/constants'
import { IGoogleParams, Prettify } from '~/cores/interfaces'

import UserService from '~/modules/user/user.service'

export default class BasicAuthGoogleCmd implements ICommand {
  constructor(options: Prettify<IGoogleParams>) {
    Object.assign(this, options)
  }
}

@CommandHandler(BasicAuthGoogleCmd)
export class BasicAuthGoogleHlr implements ICommandHandler<BasicAuthGoogleCmd> {
  constructor(private readonly userService: UserService) {
    // eslint-disable-next-line prefer-destructuring
  }
  async execute(cmd: IGoogleParams) {
    const { email, name } = cmd

    // Step 2: Create user via UserService and get the payload
    return await this.userService.create(ENetwork.GOOGLE, { email, fullname: name, hashedPassword: '' })
  }
}
