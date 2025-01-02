import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

import { VARCHAR_LENGTH } from '../constants'

export class EmailDto {
  @ApiProperty({
    name: 'email',
    description: "The user's email. This field is **required** and must be a valid email.",
    example: 'quangpm220503vt@gmail.com',
    required: true,
  })
  @IsEmail({}, { message: 'E422_EMAIL_MUST_BE_VALID' })
  @IsNotEmpty({ message: 'E422_EMAIL_MUST_NOT_BE_EMPTY' })
  @MaxLength(VARCHAR_LENGTH, { message: 'E422_EMAIL_MUST_NOT_BE_MORE_THAN_255_CHARACTERS' })
  email: string
}
