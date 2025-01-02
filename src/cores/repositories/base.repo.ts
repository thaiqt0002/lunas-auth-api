// eslint-disable-next-line import/named
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'

interface HasIdAndUuid {
  id?: number | string
  uuid?: string
}

export abstract class BaseAbstractRepo<T extends HasIdAndUuid> implements IBaseRepo<T> {
  private entity: Repository<T>
  protected constructor(entity: Repository<T>) {
    this.entity = entity
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data)
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data)
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data)
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data)
  }

  public async findOne(options: FindManyOptions<T>): Promise<T> {
    return await this.entity.findOne(options)
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = { id }
    return await this.entity.findOneBy(options)
  }

  public async findOneByUuid(uuid: any): Promise<T> {
    const options: FindOptionsWhere<T> = { uuid }
    return await this.entity.findOneBy(options)
  }

  public async findByCondition(filterCondition: FindManyOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition)
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations)
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options)
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data)
  }

  public async deleteById(id: any): Promise<DeleteResult> {
    return await this.entity.delete({ id })
  }

  public async deleteByUuid(uuid: any): Promise<DeleteResult> {
    return await this.entity.delete({ uuid })
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike)
  }
}
