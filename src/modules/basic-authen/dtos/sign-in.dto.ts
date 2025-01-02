import { HttpStatus } from '@nestjs/common'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'

import { ISignInParams } from '~/cores/interfaces'

import { BaseAuthDto } from './base.dto'

export class SignInParamsDto extends IntersectionType(BaseAuthDto) implements ISignInParams {}

export class SignInSuccessResDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.ACCEPTED,
  })
  statusCode: HttpStatus

  @ApiProperty({
    default: null,
    type: Object,
  })
  data: null

  @ApiProperty({
    default: 'C202_SIGN_IN_SUCCESSFULLY',
    type: String,
  })
  message: 'C202_SIGN_IN_SUCCESSFULLY'

  @ApiProperty({
    default: null,
    type: Object,
  })
  error: null
}

export class BasicAuthenSignInDto extends IntersectionType(SignInParamsDto) {}
