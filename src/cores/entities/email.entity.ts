import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import CustomAddressEntity from './custom-address.entity'
import UserEntity from './user.entity'
import { IBaseEmail } from '../interfaces/email.interface'

@Entity({ name: 'Email' })
export default class EmailEntity implements IBaseEmail {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('char', { name: 'user_uuid', length: 36 })
  userUuid: string

  @Column('char', { name: 'code', length: 6 })
  code: string

  @Column('timestamp', { name: 'expired_at' })
  expiredAt: Date

  @Column('timestamp', { name: 'verified_at' })
  verifiedAt: Date

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date

  @OneToOne(() => CustomAddressEntity, (address) => address)
  customAddress: CustomAddressEntity

  @ManyToOne(() => UserEntity, (user) => user.emails)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserEntity
}
