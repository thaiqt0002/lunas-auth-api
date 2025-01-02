import { HttpStatus } from '@nestjs/common'
import { ApiProperty, PickType } from '@nestjs/swagger'

import { IError } from '~/cores/interfaces'

import { BaseRoleDto } from './base.dto'

export class CreateRoleParamsDto extends PickType(BaseRoleDto, ['name']) {}

export class CreateRoleSuccessResDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.CREATED,
    example: HttpStatus.CREATED,
  })
  statusCode: HttpStatus.CREATED

  @ApiProperty({
    description: 'Data returned from the operation',
    default: null,
    type: Object,
  })
  data: null

  @ApiProperty({
    name: 'message',
    description: 'Message indicating the outcome of the operation',
    default: 'C200_ROLE_CREATED',
    type: String,
  })
  message: 'C200_ROLE_CREATED'

  @ApiProperty({
    description: 'Error data',
    default: null,
    type: Object,
  })
  error: null
}

export class CreateRole422ResDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY

  @ApiProperty({
    description: 'Data returned from the operation',
    default: null,
    type: Object,
  })
  data: null

  @ApiProperty({
    name: 'message',
    description: 'Message indicating the outcome of the operation',
    default: 'E422_VALIDATION_ERROR',
    type: String,
  })
  message: null

  @ApiProperty({
    default: {
      code: 'E422_VALIDATION_ERROR',
      desc: 'Role must be one of the following values: ADMIN, USER',
    },
    type: Object,
  })
  error: IError
}
