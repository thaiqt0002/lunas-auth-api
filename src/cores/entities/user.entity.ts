import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

import { IBaseUser } from '~/cores/interfaces'

import BioEntity from './bio.entity'
import CustomAddressEntity from './custom-address.entity'
import EmailEntity from './email.entity'
import NetworkEntity from './network.entity'
import RoleEntity from './role.entity'

@Entity({ name: 'User' })
export default class UserEntity implements IBaseUser {
  @PrimaryColumn('char', { name: 'uuid', length: 36 })
  uuid: string

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('varchar', { name: 'hashed_password', length: 255 })
  hashedPassword: string

  @Column('varchar', { name: 'refresh_token', length: 255 })
  refreshToken: string

  @Column('int', { name: 'role_id' })
  roleId: number

  @Column('tinyint', { name: 'is_active' })
  isActivated: number

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt: Date

  @OneToOne(() => BioEntity, (bio) => bio.user)
  bio: BioEntity

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity

  @OneToMany(() => NetworkEntity, (network) => network.user)
  networks: NetworkEntity[]

  @OneToMany(() => EmailEntity, (email) => email.user)
  emails: EmailEntity[]

  @OneToMany(() => CustomAddressEntity, (address) => address.user)
  customAddresses: CustomAddressEntity[]

  @BeforeInsert()
  insertDates() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date()
  }
}
