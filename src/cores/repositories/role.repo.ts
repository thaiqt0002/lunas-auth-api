import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import RoleEntity from '~/cores/entities/role.entity'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

@Injectable()
export default class RoleRepo extends BaseAbstractRepo<RoleEntity> implements IBaseRepo<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    repo: Repository<RoleEntity>,
  ) {
    super(repo)
  }
}
