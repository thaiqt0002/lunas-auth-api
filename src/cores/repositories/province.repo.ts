import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import ProvinceEntity from '../entities/provinces.entity'

@Injectable()
export default class ProvinceRepo extends BaseAbstractRepo<ProvinceEntity> implements IBaseRepo<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly repo: Repository<ProvinceEntity>,
  ) {
    super(repo)
  }
}
