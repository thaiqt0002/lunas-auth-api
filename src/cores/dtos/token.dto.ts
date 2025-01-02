import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

class TokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:[\w-]+\.){2}[\w-]+$/, {
    message: 'E400_INVALID_TOKEN_FORMAT',
  })
  token: string
}
export default TokenDto
