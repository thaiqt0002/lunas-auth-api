import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumberString, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator'

import {
  MAX_FULLNAME_LENGTH,
  MAX_HASHED_PASSWORD_LENGTH,
  MAX_PHONE_NUMBER_LENGTH,
  MAX_TOKEN_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_FULLNAME_LENGTH,
  MIN_HASHED_PASSWORD_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  MIN_TOKEN_LENGTH,
  MIN_USERNAME_LENGTH,
} from '~/cores/constants'

export class BaseUserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
    readOnly: true,
  })
  @IsUUID('4', {
    message: 'ID must be a valid UUID version 4',
  })
  id: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string

  @ApiProperty({
    description: 'Hashed password of the user. This should not be exposed in API responses.',
    example: '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36swL8hJvpqciH6Bh0f.e8e', // bcrypt hash example
    required: true,
  })
  @IsString({
    message: 'Password must be a string',
  })
  @Length(MIN_HASHED_PASSWORD_LENGTH, MAX_HASHED_PASSWORD_LENGTH, {
    message: 'Password must be between 50 and 60 characters long',
  })
  hashedPassword: string

  @ApiProperty({
    description: 'Refresh token used for re-authentication',
    example: 'def50200b2f60e6f4d01aa01c1fbefc7cb0c',
    required: true,
  })
  @IsString({
    message: 'Refresh token must be a string',
  })
  @Length(MIN_TOKEN_LENGTH, MAX_TOKEN_LENGTH, {
    message: 'Refresh token must be between 40 and 255 characters long',
  })
  refreshToken: string

  @ApiProperty({
    description: 'Unique identifier of the role associated with the user',
    example: '550e8400-e29b-41d4-a716-446655440001',
    required: true,
  })
  @IsUUID('4', {
    message: 'Role ID must be a valid UUID version 4',
  })
  roleId: string
}

export class BaseBioDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
    readOnly: true,
  })
  @IsUUID('4', {
    message: 'ID must be a valid UUID version 4',
  })
  id: string

  @ApiProperty({
    description: 'Username chosen by the user. Must be unique within the system.',
    example: 'john_doe123',
    required: true,
  })
  @IsString({
    message: 'Username must be a string',
  })
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH, {
    message: 'Username must be between 3 and 20 characters long',
  })
  @Matches(/^\w+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string

  @ApiProperty({
    description: 'Full name of the user. Should only contain letters and spaces.',
    example: 'John Doe',
    required: true,
  })
  @IsString({
    message: 'Full name must be a string',
  })
  @Length(MIN_FULLNAME_LENGTH, MAX_FULLNAME_LENGTH, {
    message: 'Full name must be between 2 and 50 characters long',
  })
  @Matches(/^[\sA-Za-z]+$/, {
    message: 'Full name can only contain letters and spaces',
  })
  fullname: string

  @ApiProperty({
    description: 'Phone number of the user, including the country code if applicable.',
    example: '+1234567890',
    required: false,
  })
  @IsNumberString(
    {},
    {
      message: 'Phone number must be a string of numbers',
    },
  )
  @IsOptional()
  @Length(MIN_PHONE_NUMBER_LENGTH, MAX_PHONE_NUMBER_LENGTH, {
    message: 'Phone number must be between 7 and 15 digits long',
  })
  phoneNumber: string
}
