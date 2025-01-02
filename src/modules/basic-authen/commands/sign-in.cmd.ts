import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { compare } from 'bcrypt'

import { ENetwork, ERRORS } from '~/cores/constants'
import { UserEntity } from '~/cores/entities'

import UserService from '~/modules/user/user.service'

import { BasicAuthenSignInDto } from '../dtos/sign-in.dto'

export default class BasicAuthenSignInCommand extends BasicAuthenSignInDto implements ICommand {
  constructor(options: BasicAuthenSignInDto) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(BasicAuthenSignInCommand)
export class BasicAuthenSignInHandler implements ICommandHandler<BasicAuthenSignInCommand> {
  constructor(private readonly userService: UserService) {}
  async execute({ email, password }: BasicAuthenSignInCommand) {
    const existingUser = await this.userService.findByEmail({ email })
    if (!existingUser) {
      throw new RpcException(ERRORS.EMAIL_OR_PASSWORD_IS_INCORRECT)
    }
    await this.verifyPassword(password, existingUser)

    const { uuid, role } = existingUser
    return { uuid, role: role.name }
  }

  private async verifyPassword(password: string, user: UserEntity): Promise<boolean> {
    const { uuid, hashedPassword } = user

    const isExistedNetwork = await this.userService.findNetworkByUserId({ uuid }, ENetwork.BASIC)

    const isMatch = await this.matchPassword(password, hashedPassword)

    if (!user || !isExistedNetwork || !isMatch) {
      throw new RpcException(ERRORS.EMAIL_OR_PASSWORD_IS_INCORRECT)
    }

    const { isActivated } = user

    if (!isActivated) {
      throw new RpcException(ERRORS.USER_IS_NOT_ACTIVATED)
    }

    return true
  }

  private async matchPassword(password: string, hashedPassword: string) {
    return Boolean(await compare(password, hashedPassword))
  }
}
