import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'

import CustomAddressEntity from './custom-address.entity'
import DistrictEntity from './district.entity'
import { IBaseWard } from '../interfaces'

@Entity({ name: 'Ward' })
export default class WardEntity implements IBaseWard {
  @PrimaryColumn('char', { name: 'id', length: 36 })
  id: string

  @Column('varchar', { name: 'name', length: 36 })
  name: string

  @Column('varchar', { name: 'type', length: 36 })
  type: string

  @Column('char', { name: 'district_id', length: 36 })
  districtId: string

  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  @JoinColumn({ name: 'district_id', referencedColumnName: 'id' })
  district: DistrictEntity

  @OneToOne(() => CustomAddressEntity, (address) => address.ward)
  customAddress: CustomAddressEntity
}
