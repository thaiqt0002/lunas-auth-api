import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import UserEntity from './user.entity'
import { ERole, IBaseRole } from '../interfaces'

@Entity({ name: 'Role' })
export default class RoleEntity implements IBaseRole {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: ERole

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[]
}
