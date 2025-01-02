import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { IError } from '../interfaces'

export class ResponseDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.OK,
  })
  statusCode: HttpStatus

  @ApiProperty({
    description: 'Message indicating the outcome of the operation',
    default: null,
  })
  message: string | null

  @ApiProperty({
    description: 'Data returned from the operation',
    default: null,
  })
  error: IError | null
}
