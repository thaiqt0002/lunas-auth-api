import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import DistrictEntity from './district.entity'
import { IBaseProvince } from '../interfaces/province.interface'

@Entity({ name: 'Province' })
export default class ProvinceEntity implements IBaseProvince {
  @PrimaryColumn('char', { name: 'id', length: 36 })
  id: string

  @Column('varchar', { name: 'name', length: 36 })
  name: string

  @Column('varchar', { name: 'type', length: 36 })
  type: string

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[]
}
