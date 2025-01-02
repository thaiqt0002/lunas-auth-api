import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, VARCHAR_LENGTH } from '~/cores/constants'
import { IBaseAuthen } from '~/cores/interfaces'

export class BaseAuthDto implements IBaseAuthen {
  @ApiProperty({
    name: 'email',
    example: 'quangpm220503vt@gmail.com',
    required: true,
  })
  @Transform(({ value }) => value.trim().toLowerCase()) // Trims spaces and converts to lowercase
  @IsEmail({}, { message: 'E422_EMAIL_MUST_BE_VALID' })
  @IsNotEmpty({ message: 'E422_EMAIL_MUST_NOT_BE_EMPTY' })
  @MaxLength(VARCHAR_LENGTH, { message: 'E422_EMAIL_MUST_NOT_BE_MORE_THAN_255_CHARACTERS' })
  email: string

  @ApiProperty({
    name: 'password',
    example: 'P@ssw0rd123',
    minLength: 8,
    maxLength: 50,
    required: true,
  })
  @IsString({ message: 'E422_PASSWORD_MUST_BE_A_STRING' })
  @IsNotEmpty({ message: 'E422_PASSWORD_IS_REQUIRED' })
  @MinLength(MIN_PASSWORD_LENGTH, { message: 'E422_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG' })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: 'E422_PASSWORD_MUST_NOT_EXCEED_50_CHARACTERS' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&+=@^]).{8,50}$/, {
    message:
      'E422_PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER_ONE_LOWERCASE_LETTER_ONE_DIGIT_AND_ONE_SPECIAL_CHARACTER',
  })
  password: string
}
