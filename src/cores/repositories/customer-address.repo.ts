import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { CustomAddressEntity } from '../entities'

@Injectable()
export default class CustomerAddressRepo
  extends BaseAbstractRepo<CustomAddressEntity>
  implements IBaseRepo<CustomAddressEntity>
{
  constructor(
    @InjectRepository(CustomAddressEntity)
    private readonly repo: Repository<CustomAddressEntity>,
  ) {
    super(repo)
  }

  public async updateAddress(params: { id: number; userUuid: string; data: Partial<CustomAddressEntity> }) {
    const { id, userUuid, data } = params
    await this.repo
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id AND userUuid = :userUuid', { id, userUuid })
      .execute()
  }
}
