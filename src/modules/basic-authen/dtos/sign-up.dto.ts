import { HttpStatus } from '@nestjs/common'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '~/cores/constants'

import { BaseAuthDto } from './base.dto'

export class SignUpParamsDto extends PickType(BaseAuthDto, ['email', 'password']) {
  @ApiProperty({
    default: 'Pham Minh Quang',
    required: true,
  })
  @IsString({ message: 'E422_FULLNAME_MUST_BE_A_STRING' })
  @IsNotEmpty({ message: 'E422_FULLNAME_IS_REQUIRED' })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: 'E422_FULLNAME_MUST_BE_BETWEEN_2_AND_50_CHARACTERS' })
  fullname: string
}

export class SignUpSuccessResDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.CREATED,
  })
  statusCode: HttpStatus.CREATED

  @ApiProperty({ default: null, type: Object })
  data: null

  @ApiProperty({
    default: 'C202_SIGN_UP_SUCCESSFULLY',
    type: String,
  })
  message: 'C202_SIGN_UP_SUCCESSFULLY'

  @ApiProperty({ default: null, type: Object })
  error: null
}
