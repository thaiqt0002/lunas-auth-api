import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BioEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

@Injectable()
export default class BioRepo extends BaseAbstractRepo<BioEntity> implements IBaseRepo<BioEntity> {
  constructor(
    @InjectRepository(BioEntity)
    private readonly repo: Repository<BioEntity>,
  ) {
    super(repo)
  }
  public async deleteByUserUuid(uuid: string): Promise<void> {
    await this.repo.createQueryBuilder().delete().where('userUuid = :uuid', { uuid }).execute()
  }
}
