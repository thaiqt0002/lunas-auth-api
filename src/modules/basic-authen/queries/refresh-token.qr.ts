import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ERole } from '~/cores/interfaces'
import TokenService from '~/cores/modules/token/service'
import { UserRepo } from '~/cores/repositories'

export default class BasicAuthenRefreshQuery implements IQuery {
  public readonly uuid: string
  public readonly role: ERole
  constructor(options: BasicAuthenRefreshQuery) {
    Object.assign(this, options)
  }
}

@QueryHandler(BasicAuthenRefreshQuery)
export class BasicAuthenRefreshQueryHandler implements IQueryHandler<BasicAuthenRefreshQuery> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepo: UserRepo,
  ) {}
  async execute({ uuid }: BasicAuthenRefreshQuery): Promise<any> {
    //eslint-disable-next-line
    const existingUser = await this.userRepo.findOneByUuid(uuid)
    if (!existingUser) {
      throw new RpcException(ERRORS.USER_NOT_FOUND)
    }
    return true
  }
}
