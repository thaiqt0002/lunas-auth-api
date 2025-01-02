import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class DeleteRoleSuccessResDto {
  @ApiProperty({
    enumName: 'HttpStatus',
    description: 'HTTP status code',
    default: HttpStatus.NO_CONTENT,
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
    default: 'C200_ROLE_DELETED_SUCCESSFULLY',
    type: String,
  })
  message: 'C200_ROLE_DELETED_SUCCESSFULLY'

  @ApiProperty({
    description: 'Error data',
    default: null,
    type: Object,
  })
  error: null
}
