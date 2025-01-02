import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../constants'

export class PasswordDto {
  @ApiProperty({
    name: 'password',
    description:
      'The user password. This field is **required** and must be at least 8 characters long. It must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    example: 'P@ssw0rd123',
    minLength: MIN_PASSWORD_LENGTH,
    maxLength: MAX_PASSWORD_LENGTH,
    required: true,
  })
  @IsString({ message: 'E422_PASSWORD_MUST_BE_A_STRING' })
  @IsNotEmpty({ message: 'E422_PASSWORD_IS_REQUIRED' })
  @MinLength(MIN_PASSWORD_LENGTH, { message: 'E422_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG' })
  @MaxLength(MIN_PASSWORD_LENGTH, { message: 'E422_PASSWORD_MUST_NOT_EXCEED_50_CHARACTERS' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&+=@^]).{8,50}$/, {
    message:
      'E422_PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER_ONE_LOWERCASE_LETTER_ONE_DIGIT_AND_ONE_SPECIAL_CHARACTER',
  })
  password: string
}
