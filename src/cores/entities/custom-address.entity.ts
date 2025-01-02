import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import EmailEntity from './email.entity'
import UserEntity from './user.entity'
import WardEntity from './ward.entity'
import { IBaseCustomerAddress } from '../interfaces'

@Entity({ name: 'CustomerAddress' })
export default class CustomAddressEntity implements IBaseCustomerAddress {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('char', { name: 'user_uuid', length: 36 })
  userUuid: string

  @Column('varchar', { name: 'fullname', length: 255 })
  fullname: string

  @Column('varchar', { name: 'phone_number', length: 255 })
  phoneNumber: string

  @Column('int', { name: 'email_id' })
  emailId: number

  @Column('char', { name: 'ward_id', length: 36 })
  wardId: string

  @Column('varchar', { name: 'street', length: 255 })
  street: string

  @Column('tinyint', { name: 'is_default' })
  isDefault: number

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => UserEntity, (user) => user.customAddresses)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserEntity

  @OneToOne(() => EmailEntity, (email) => email.customAddress)
  @JoinColumn({ name: 'email_id', referencedColumnName: 'id' })
  email: EmailEntity

  @OneToOne(() => WardEntity, (ward) => ward.customAddress)
  @JoinColumn({ name: 'ward_id', referencedColumnName: 'id' })
  ward: WardEntity

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
