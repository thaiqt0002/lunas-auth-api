import { IsString } from 'class-validator'

export class DistrictPayloadDto {
  @IsString()
  provinceId: string
}
