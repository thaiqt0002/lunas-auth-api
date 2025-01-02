import { IntersectionType } from '@nestjs/swagger'

import { UuidDto } from '~/cores/dtos'
import { IGetAvatarParams } from '~/cores/interfaces'

export class GetAvatarDto extends IntersectionType(UuidDto) implements IGetAvatarParams {}

export class GetUserDetailDto extends IntersectionType(UuidDto) implements IGetAvatarParams {}
