import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { IGetAvatarParams } from '~/cores/interfaces'
import S3Service from '~/cores/modules/S3/S3.service'
import { BioRepo } from '~/cores/repositories'

import { GetAvatarDto } from '../dtos/get-user.dto'

export default class GetUserAvatarQr extends GetAvatarDto implements IQuery {
  constructor(uuid: GetAvatarDto) {
    super()
    Object.assign(this, uuid)
  }
}

@QueryHandler(GetUserAvatarQr)
export class GetUserAvatarHandler implements IQueryHandler<GetUserAvatarQr> {
  constructor(
    private readonly bioRepo: BioRepo,
    private readonly s3: S3Service,
  ) {}
  async execute(query: IGetAvatarParams): Promise<string> {
    const { uuid } = query
    const bio = await this.bioRepo.findOne({ where: { userUuid: uuid } })
    if (bio) {
      const avatar = `user/avatar/${uuid}_${Date.now()}.webp`
      if (bio.avatar) {
        await this.s3.deleteObject([{ Key: bio.avatar }])
      }
      await this.bioRepo.save({
        ...bio,
        avatar,
      })
      return await this.s3.getPreSignedUrl(avatar)
    }
    throw new RpcException(ERRORS.USER_NOT_FOUND)
  }
}
