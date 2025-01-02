import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber } from 'class-validator'

import { ERole, IBaseRole } from '~/cores/interfaces'

export class BaseRoleDto implements IBaseRole {
  @ApiProperty({
    description: 'The id of the role',
    example: 1,
    required: true,
  })
  @IsNumber(
    {},
    {
      message: 'Id must be a number',
    },
  )
  id: number

  @ApiProperty({
    description: 'The name of the role',
    example: ERole.USER,
    enum: ERole,
    enumName: 'ERole',
    required: true,
  })
  @IsEnum(ERole, {
    message: `Role must be one of the following values: ${Object.values(ERole).join(', ')}`,
  })
  name: ERole
}
