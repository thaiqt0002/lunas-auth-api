import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { NetworkEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { ENetwork } from '../constants'

@Injectable()
export default class NetworkRepo extends BaseAbstractRepo<NetworkEntity> implements IBaseRepo<NetworkEntity> {
  constructor(
    @InjectRepository(NetworkEntity)
    private readonly repo: Repository<NetworkEntity>,
  ) {
    super(repo)
  }

  public async findByUserUuid(uuid: string): Promise<NetworkEntity> {
    return await this.repo.findOne({
      where: { userUuid: uuid },
    })
  }

  public async findByUserUuidAndType(network: ENetwork, uuid: string): Promise<NetworkEntity> {
    return await this.repo.findOne({
      where: { network, userUuid: uuid },
    })
  }

  public async deleteByUserUuid(uuid: string): Promise<void> {
    await this.repo.createQueryBuilder().delete().where('userUuid = :uuid', { uuid }).execute()
  }
}
