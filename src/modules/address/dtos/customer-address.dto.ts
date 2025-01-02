import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator'

import { FIVE } from '~/cores/constants'
import { UuidDto } from '~/cores/dtos'

export class CreateCustomerAddressParamsDto extends IntersectionType(UuidDto) {
  @ApiProperty({
    description: 'Full name of customer',
    example: 'Pham Minh Quang',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  readonly fullname: string

  @ApiProperty({
    description: 'Phone number of customer',
    example: '0987654321',
  })
  @IsString()
  @IsMobilePhone(
    'vi-VN',
    {},
    {
      message: 'Phone number is invalid',
    },
  )
  readonly phoneNumber: string

  @ApiProperty({
    description: 'Email of customer',
    example: 'quangpm220503vt@gmail.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string

  @ApiProperty({
    description: 'City of customer',
    example: 'Ho Chi Minh',
  })
  @IsString()
  @IsNotEmpty()
  readonly street: string

  @ApiProperty({
    description: 'Ward of customer',
    example: '00023',
  })
  @IsString()
  @Length(FIVE, FIVE)
  readonly wardId: string

  @ApiProperty({
    description: 'Default address',
    example: 1,
  })
  @IsNumber()
  @IsEnum([0, 1], {
    message: 'Default address must be 0 or 1',
  })
  @IsOptional()
  readonly isDefault?: number
}

export class UpdateCustomerAddressParamsDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 5,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
    readOnly: true,
  })
  @IsUUID('4', {
    message: 'ID must be a valid UUID version 4',
  })
  readonly userUuid: string

  @ApiProperty({
    description: 'Full name of customer',
    example: 'Pham Minh Quang',
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly fullname?: string

  @ApiProperty({
    description: 'Phone number of customer',
    example: '0987654321',
  })
  @IsString()
  @IsMobilePhone(
    'vi-VN',
    {},
    {
      message: 'Phone number is invalid',
    },
  )
  @IsOptional()
  readonly phoneNumber?: string

  @ApiProperty({
    description: 'Email of customer',
    example: '',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({
    description: 'Street of customer',
    example: 'Pham Van Dong',
  })
  @IsString()
  @IsOptional()
  readonly street?: string

  @ApiProperty({
    description: 'Ward of customer',
    example: '00023',
  })
  @IsString()
  @Length(FIVE, FIVE)
  @IsOptional()
  readonly wardId?: string

  @ApiProperty({
    description: 'Default address',
    example: 1,
  })
  @IsNumber()
  @IsEnum([0, 1], {
    message: 'Default address must be 0 or 1',
  })
  @IsOptional()
  readonly isDefault?: number
}
