import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { IGetMeParams } from '~/cores/interfaces'
import { UserRepo } from '~/cores/repositories'

import { GetMeDto } from '../basic-authen.dtos'

export default class GetMeQuery extends GetMeDto implements IQuery {
  constructor(options: GetMeDto) {
    super()
    Object.assign(this, options)
  }
}

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(private readonly userRepo: UserRepo) {}
  async execute({ uuid }: IGetMeParams) {
    const user = await this.userRepo.findMe(uuid)
    return {
      uuid: user.uuid,
      role: user.role.name,
      email: user.email,
      fullname: user.bio.fullname,
      username: user.bio.username,
      avatar: user.bio.avatar ?? null,
    }
  }
}
