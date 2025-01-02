import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { IBaseContact } from '../interfaces'

@Entity({ name: 'Contact' })
export default class ContactEntity implements IBaseContact {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'topic', length: 255 })
  topic: string

  @Column('text', { name: 'content' })
  content: string

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'email', length: 100 })
  email: string

  @Column('varchar', { name: 'phone_number', length: 15 })
  phoneNumber: string

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date

  @BeforeInsert()
  insertDates() {
    this.createdAt = new Date()
  }
}
