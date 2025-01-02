import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult } from 'typeorm/browser'

import { UserEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

@Injectable()
export default class UserRepo extends BaseAbstractRepo<UserEntity> implements IBaseRepo<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {
    super(repo)
  }

  public findMe(uuid: string) {
    return this.findOne({
      relations: {
        role: true,
        bio: true,
      },
      where: { uuid },
    })
  }

  public findByEmail(email: string): Promise<UserEntity> {
    return this.repo.findOne({
      relations: {
        role: true,
      },
      where: { email },
    })
  }

  public updatePwd(uuid: string, pwd: string): Promise<UpdateResult> {
    return this.repo
      .createQueryBuilder()
      .update()
      .set({ hashedPassword: pwd })
      .where('uuid = :uuid', { uuid })
      .execute()
  }

  public async updateUser(uuid: string, data: Partial<UserEntity>): Promise<void> {
    await this.repo.createQueryBuilder().update().set(data).where('uuid = :uuid', { uuid }).execute()
  }

  public async activeAccount(uuid: string): Promise<void> {
    await this.repo.createQueryBuilder().update().set({ isActivated: 1 }).where('uuid = :uuid', { uuid }).execute()
  }
}
