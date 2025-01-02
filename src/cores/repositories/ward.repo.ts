import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import WardEntity from '../entities/ward.entity'

@Injectable()
export default class WardRepo extends BaseAbstractRepo<WardEntity> implements IBaseRepo<WardEntity> {
  constructor(
    @InjectRepository(WardEntity)
    private readonly repo: Repository<WardEntity>,
  ) {
    super(repo)
  }
}
