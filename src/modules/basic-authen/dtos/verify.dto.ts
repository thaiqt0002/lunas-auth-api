import { IntersectionType } from '@nestjs/swagger'

import TokenDto from '~/cores/dtos/token.dto'

export class VerifyParamsDto extends IntersectionType(TokenDto) {}
