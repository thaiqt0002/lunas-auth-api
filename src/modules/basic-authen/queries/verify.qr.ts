import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ERole } from '~/cores/interfaces'

import UserService from '~/modules/user/user.service'

export default class BasicAuthenVerifyQuery implements IQuery {
  public readonly uuid: string
  public readonly role: ERole
  constructor(options: { uuid: string; role: ERole }) {
    Object.assign(this, options)
  }
}

@QueryHandler(BasicAuthenVerifyQuery)
export class BasicAuthenVerifyHandler implements IQueryHandler<BasicAuthenVerifyQuery> {
  constructor(private readonly userService: UserService) {}
  async execute({ uuid }: BasicAuthenVerifyQuery) {
    const user = await this.userService.findById({ uuid })

    if (!user) {
      throw new RpcException(ERRORS.USER_NOT_FOUND)
    }

    if (user.isActivated) {
      throw new RpcException(ERRORS.USER_IS_ACTIVATED)
    }
    await this.userService.activeAccount({ uuid })

    return {
      uuid: user.uuid,
      role: ERole.USER,
    }
  }
}
