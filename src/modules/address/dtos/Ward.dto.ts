import { IsString } from 'class-validator'

export class WardPayloadDto {
  @IsString()
  districtId: string
}
