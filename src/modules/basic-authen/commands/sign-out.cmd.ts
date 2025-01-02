import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import TokenService from '~/cores/modules/token/service'

import { BasicAuthenSignOutDto } from '../basic-authen.dtos'

export default class BasicAuthenSignOutCommand extends BasicAuthenSignOutDto implements ICommand {
  constructor(options: BasicAuthenSignOutDto) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(BasicAuthenSignOutCommand)
export class BasicAuthenSignOutHandler implements ICommandHandler<BasicAuthenSignOutCommand> {
  constructor(private readonly tokenServ: TokenService) {}
  // eslint-disable-next-line
  async execute({ res }: BasicAuthenSignOutDto) {
    const payload = {
      ...this.tokenServ.generateToken,
      ...this.tokenServ.genCookieOption,
      maxAge: 0,
    }
    res.clearCookie('access_token', payload)
    res.clearCookie('refresh_token', payload)
  }
}
