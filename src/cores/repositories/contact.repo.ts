import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { ContactEntity } from '../entities'

@Injectable()
export default class ContactRepo extends BaseAbstractRepo<ContactEntity> implements IBaseRepo<ContactEntity> {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly _: Repository<ContactEntity>,
  ) {
    super(_)
  }
}
