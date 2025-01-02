import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import BioRepo from './bio.repo'
import ContactRepo from './contact.repo'
import CustomAddressRepo from './customer-address.repo'
import DistrictRepo from './district.repo'
import EmailRepo from './email.repo'
import NetworkRepo from './network.repo'
import ProvinceRepo from './province.repo'
import RoleRepo from './role.repo'
import UserRepo from './user.repo'
import WardRepo from './ward.repo'
import {
  BioEntity,
  ContactEntity,
  CustomAddressEntity,
  DistrictEntity,
  EmailEntity,
  NetworkEntity,
  ProvinceEntity,
  RoleEntity,
  UserEntity,
  WardEntity,
} from '../entities'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BioEntity,
      RoleEntity,
      NetworkEntity,
      ProvinceEntity,
      DistrictEntity,
      WardEntity,
      EmailEntity,
      CustomAddressEntity,
      ContactEntity,
    ]),
  ],
  providers: [
    UserRepo,
    BioRepo,
    NetworkRepo,
    RoleRepo,
    ProvinceRepo,
    DistrictRepo,
    WardRepo,
    EmailRepo,
    CustomAddressRepo,
    ContactRepo,
  ],
  exports: [
    UserRepo,
    BioRepo,
    NetworkRepo,
    RoleRepo,
    ProvinceRepo,
    DistrictRepo,
    WardRepo,
    EmailRepo,
    CustomAddressRepo,
    ContactRepo,
  ],
})
export default class ReposModule {}
