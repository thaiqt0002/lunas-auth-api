// eslint-disable-next-line import/named, no-shadow
import { DeepPartial, FindManyOptions } from 'typeorm'

export interface IBaseRepo<T> {
  create(data: DeepPartial<T>): T
  createMany(data: DeepPartial<T>[]): T[]
  save(data: DeepPartial<T>): Promise<T>
  saveMany(data: DeepPartial<T>[]): Promise<T[]>
  findOne(options: FindManyOptions<T>): Promise<T>
  findOneById(id: number): Promise<T>
  findOneByUuid(uuid: string): Promise<T>
  findByCondition(filterCondition: FindManyOptions<T>): Promise<T>
  findAll(options?: FindManyOptions<T>): Promise<T[]>
  remove(data: T): Promise<T>
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>
  preload(entityLike: DeepPartial<T>): Promise<T>
}
