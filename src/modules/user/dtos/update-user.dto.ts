import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    description: 'Fullname of the user',
    example: 'Pham Quang',
  })
  @IsOptional()
  fullname?: string

  @ApiProperty({
    description: 'Username of the user',
    example: 'quang123',
  })
  @IsOptional()
  username?: string

  @ApiProperty({
    description: 'Email of the user',
    example: 'quangquang@gmail.com',
  })
  @IsOptional()
  email?: string

  @ApiProperty({
    description: 'Phone number of the user',
    example: '0123456789',
  })
  @IsOptional()
  phoneNumber?: string
}
