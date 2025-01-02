import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import UserEntity from './user.entity'
import { IBaseBio } from '../interfaces'

@Entity('Bio')
export default class BioEntity implements IBaseBio {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('char', { name: 'user_uuid', length: 36 })
  userUuid: string

  @Column('varchar', { name: 'avatar' })
  avatar: string

  @Column('varchar', { name: 'username', length: 255 })
  username: string

  @Column('varchar', { name: 'fullname', length: 255 })
  fullname: string

  @Column('varchar', { name: 'phone_number', length: 255 })
  phoneNumber: string

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt: Date

  @OneToOne(() => UserEntity, (user) => user.bio)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserEntity

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
