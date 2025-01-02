import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserRepo } from '~/cores/repositories'

export default class GetAllUserQr implements IQuery {}

@QueryHandler(GetAllUserQr)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQr> {
  constructor(private readonly userRepo: UserRepo) {}
  async execute() {
    const users = await this.userRepo.findAll({
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
    })
    return users.map(({ customAddresses, bio, emails, ...user }) => {
      return {
        ...user,
        fullname: bio ? bio.fullname : null,
        username: bio ? bio.username : null,
        phoneNumber: bio ? bio.phoneNumber : null,
        avatar: bio ? bio.avatar : null,
        emails,
        customAddresses,
      }
    })
  }
}
