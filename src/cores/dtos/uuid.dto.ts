import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsUUID } from 'class-validator'

import { IBaseId } from '../interfaces'

export class UuidDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
    readOnly: true,
  })
  @IsUUID('4', {
    message: 'ID must be a valid UUID version 4',
  })
  uuid: string
}

export class BaseIdDto implements IBaseId {
  @ApiProperty({ example: 5 })
  @IsNumberString({}, { message: 'ID must be a number' })
  id: number
}
