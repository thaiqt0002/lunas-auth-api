import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { BaseRoleDto } from './base.dto'

export class GetAllRoleResponseDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.OK,
  })
  statusCode: HttpStatus.OK

  @ApiProperty({
    description: 'Data returned from the operation',
    isArray: true,
    type: [BaseRoleDto],
  })
  data: BaseRoleDto[]

  @ApiProperty({
    name: 'message',
    description: 'Message indicating the outcome of the operation',
    default: null,
    type: String,
  })
  message: null

  @ApiProperty({
    description: 'Error data',
    default: null,
    type: Object,
  })
  error: null
}
