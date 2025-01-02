import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import AddressService from './address.service'
import { CreateCustomerAddressParamsDto, UpdateCustomerAddressParamsDto } from './dtos/customer-address.dto'
import { DistrictPayloadDto } from './dtos/District.dto'
import { WardPayloadDto } from './dtos/Ward.dto'

@Controller()
export default class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @MessagePattern('public.provinces.get')
  getProvinces() {
    return this.addressService.findAllProvinces()
  }

  @MessagePattern('public.districts.get')
  getDistricts(@Payload() data: DistrictPayloadDto) {
    return this.addressService.findDistrictsByProvinceId(data.provinceId)
  }

  @MessagePattern('public.wards.get')
  getWards(@Payload() data: WardPayloadDto) {
    return this.addressService.findWardsByDistrictId(data.districtId)
  }

  @MessagePattern('user.addresses.get')
  getAddresses(@Payload() data: { uuid: string }) {
    return this.addressService.findAddressesByUuid(data.uuid)
  }

  @MessagePattern('user.addresses.create')
  createAddress(@Payload() data: CreateCustomerAddressParamsDto) {
    return this.addressService.createAddress(data)
  }

  @MessagePattern('user.addresses.update')
  updateAddress(@Payload() data: UpdateCustomerAddressParamsDto) {
    return this.addressService.updateAddress(data)
  }

  @MessagePattern('user.addresses.delete')
  deleteAddress(@Payload() data: { id: number; userUuid: string }) {
    return this.addressService.deleteAddress(data.id, data.userUuid)
  }
}
