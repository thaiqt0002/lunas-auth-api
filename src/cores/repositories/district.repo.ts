import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { DistrictEntity } from '../entities'

@Injectable()
export default class DistrictRepo extends BaseAbstractRepo<DistrictEntity> implements IBaseRepo<DistrictEntity> {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly repo: Repository<DistrictEntity>,
  ) {
    super(repo)
  }
}
