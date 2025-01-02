import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { CustomerAddressRepo, DistrictRepo, EmailRepo, ProvinceRepo, WardRepo } from '~/cores/repositories'

import { CreateCustomerAddressParamsDto, UpdateCustomerAddressParamsDto } from './dtos/customer-address.dto'

@Injectable()
export default class AddressService {
  constructor(
    private readonly provinceRepo: ProvinceRepo,
    private readonly districtRepo: DistrictRepo,
    private readonly wardRepo: WardRepo,
    private readonly emailRepo: EmailRepo,
    private readonly customerAddressRepo: CustomerAddressRepo,
  ) {}

  public async findAllProvinces() {
    return await this.provinceRepo.findAll({
      select: {
        id: true,
        name: true,
      },
    })
  }

  public async findDistrictsByProvinceId(provinceId: string) {
    return await this.districtRepo.findAll({
      where: {
        provinceId,
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    })
  }

  public async findWardsByDistrictId(districtId: string) {
    return await this.wardRepo.findAll({
      where: {
        districtId,
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    })
  }

  public async findAddressesByUuid(uuid: string) {
    const data = await this.customerAddressRepo.findAll({
      select: {
        id: true,
        fullname: true,
        phoneNumber: true,
        email: {
          id: true,
          email: true,
        },
        street: true,
        ward: {
          id: true,
          name: true,
          type: true,
          district: {
            id: true,
            name: true,
            type: true,
          },
          districtId: false,
        },
        isDefault: true,
      },
      where: {
        userUuid: uuid,
      },
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
        email: true,
      },
    })
    return data.map(({ ward, ...item }) => ({
      ...item,
      ward: {
        id: ward.id,
        name: ward.name,
        type: ward.type,
      },
      district: {
        id: ward.district.id,
        name: ward.district.name,
        type: ward.district.type,
      },
      province: ward.district.province,
    }))
  }

  public async createAddress({ email, uuid, ...params }: CreateCustomerAddressParamsDto) {
    const isExistWard = await this.wardRepo.findOne({ where: { id: params.wardId } })
    if (!isExistWard) {
      throw new RpcException(ERRORS.WARD_IS_NOT_FOUND)
    }

    const isValidateEmail = await this.emailRepo.findOne({ where: { email, userUuid: uuid } })
    if (!isValidateEmail) {
      throw new RpcException(ERRORS.USER_NOT_HAVE_THIS_EMAIL)
    }

    const addressData = {
      ...params,
      emailId: isValidateEmail.id,
      userUuid: uuid,
    }
    const newAddress = this.customerAddressRepo.create(addressData)
    await this.customerAddressRepo.save(newAddress)

    return true
  }

  public async updateAddress({ id, userUuid, ...params }: UpdateCustomerAddressParamsDto) {
    const isExistAddress = await this.customerAddressRepo.findOne({ where: { id, userUuid } })
    if (!isExistAddress) {
      throw new RpcException(ERRORS.ADDRESS_IS_NOT_FOUND)
    }

    const isExistWard = await this.wardRepo.findOne({ where: { id: params.wardId } })
    if (!isExistWard) {
      throw new RpcException(ERRORS.WARD_IS_NOT_FOUND)
    }

    const isValidateEmail = await this.emailRepo.findOne({ where: { email: params.email, userUuid } })
    if (!isValidateEmail) {
      throw new RpcException(ERRORS.USER_NOT_HAVE_THIS_EMAIL)
    }

    const addressData = {
      ...params,
      email: undefined,
      emailId: isValidateEmail.id,
      userUuid,
    }
    await this.customerAddressRepo.updateAddress({ id, userUuid, data: addressData })
    return true
  }

  public async deleteAddress(id: number, userUuid: string) {
    const isExistAddress = await this.customerAddressRepo.findOne({ where: { id, userUuid } })
    if (!isExistAddress) {
      throw new RpcException(ERRORS.ADDRESS_IS_NOT_FOUND)
    }

    await this.customerAddressRepo.deleteById(id)
    return true
  }
}
