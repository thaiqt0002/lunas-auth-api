import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import UserEntity from './user.entity'
import { ENetwork } from '../constants'
import { IBaseNetwork } from '../interfaces'

@Entity({ name: 'Network' })
export default class NetworkEntity implements IBaseNetwork {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'network', length: 255 })
  network: ENetwork

  @Column('char', { name: 'user_uuid', length: 36 })
  userUuid: string

  @ManyToOne(() => UserEntity, (user) => user.networks)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserEntity
}
