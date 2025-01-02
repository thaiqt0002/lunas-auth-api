import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetUserDetailParams } from '~/cores/interfaces'
import { UserRepo } from '~/cores/repositories'

import { GetUserDetailDto } from '../dtos/get-user.dto'

export default class GetUserDetailQr extends GetUserDetailDto implements IQuery {
  constructor(uuid: GetUserDetailDto) {
    super()
    Object.assign(this, uuid)
  }
}

@QueryHandler(GetUserDetailQr)
export class GetUserDetailHandler implements IQueryHandler<GetUserDetailQr> {
  constructor(private readonly userRepo: UserRepo) {}
  async execute(query: GetUserDetailParams) {
    const { uuid } = query
    const users = await this.userRepo.findOne({
      select: {
        uuid: true,
        email: true,
        roleId: true,
        isActivated: true,
        createdAt: true,
        bio: {
          fullname: true,
          username: true,
          phoneNumber: true,
          avatar: true,
        },
      },
      relations: {
        bio: true,
        emails: true,
        customAddresses: true,
      },
      where: { uuid },
    })
    const { customAddresses, bio, emails, ...userData } = users

    return {
      ...userData,
      fullname: bio ? bio.fullname : null,
      username: bio ? bio.username : null,
      phoneNumber: bio ? bio.phoneNumber : null,
      avatar: bio ? bio.avatar : null,
      emails,
      customAddresses,
    }
  }
}
