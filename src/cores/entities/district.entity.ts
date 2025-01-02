import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

import ProvinceEntity from './provinces.entity'
import WardEntity from './ward.entity'
import { IBaseDistrict } from '../interfaces'

@Entity({ name: 'District' })
export default class DistrictEntity implements IBaseDistrict {
  @PrimaryColumn('char', { name: 'id', length: 36 })
  id: string

  @Column('varchar', { name: 'name', length: 36 })
  name: string

  @Column('varchar', { name: 'type', length: 36 })
  type: string

  @Column('char', { name: 'province_id', length: 36 })
  provinceId: string

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  @JoinColumn({ name: 'province_id', referencedColumnName: 'id' })
  province: ProvinceEntity

  @OneToMany(() => WardEntity, (ward) => ward.district)
  wards: WardEntity[]
}
