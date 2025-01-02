import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { EmailEntity } from '../entities'

@Injectable()
export default class EmailRepo extends BaseAbstractRepo<EmailEntity> implements IBaseRepo<EmailEntity> {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly repo: Repository<EmailEntity>,
  ) {
    super(repo)
  }

  public async updateEmail(
    id: number,
    data: {
      code: string
      expiredAt: Date
      createdAt?: Date
    },
  ): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .execute()
  }

  public async verifyEmailOtp(uuid: string, email: string, code: string) {
    await this.repo
      .createQueryBuilder('email')
      .update()
      .set({ verifiedAt: new Date(), code: null, expiredAt: null })
      .where('userUuid = :uuid AND email = :email AND code = :code', { uuid, email, code })
      .execute()
  }
}
