import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

import { MAX_FULLNAME_LENGTH, MIN_FULLNAME_LENGTH } from '~/cores/constants'

import { BaseUserDto } from './base.dto'

export class CreateUserDto extends OmitType(BaseUserDto, ['id', 'refreshToken', 'roleId']) {
  @ApiProperty({
    description: 'Full name of the user, required for user identification. Must be between 2 and 50 characters.',
    example: 'Pham Minh Quang',
    required: true,
  })
  @IsString({
    message: 'Full name must be a string',
  })
  @IsNotEmpty({
    message: 'Full name is required',
  })
  @Length(MIN_FULLNAME_LENGTH, MAX_FULLNAME_LENGTH, {
    message: 'Full name must be between 2 and 50 characters',
  })
  fullname: string
}

export class UserCreateDto {
  @ApiProperty({
    description: 'Full name of user',
    example: 'Thai Tran Duy',
  })
  fullname: string
  @ApiProperty({
    description: 'Username',
    example: 'thaiqt',
  })
  username: string
  @ApiProperty({
    description: 'Email of the user, required for user identification.',
    example: 'thaiqt0002@gmail.com',
  })
  email: string
  @ApiProperty({
    description: 'Hashed password of the user, required for user authentication.',
    example: '123456',
  })
  password: string
  @ApiProperty({
    description: 'Role for this user',
    example: '2',
  })
  roleId: number
}
