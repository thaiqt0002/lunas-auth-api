import { TNetworkSchema, TNewNetworkSchema } from '@customafk/lunas-db/userDB'
import { Injectable } from '@nestjs/common'

import { NetworkEntity } from '~/cores/entities'
import { NetworkRepo } from '~/cores/repositories'

import { IFindByUserIdProps } from './interfaces'

abstract class INetworkService {
  public abstract findByUserUuid(props: IFindByUserIdProps): Promise<TNetworkSchema>
  public abstract create(network: TNewNetworkSchema): Promise<void>
}

@Injectable()
class NetworkService implements INetworkService {
  constructor(private readonly repo: NetworkRepo) {}
  public async create(network: NetworkEntity): Promise<void> {
    const newNetwork = this.repo.create(network)
    await this.repo.save(newNetwork)
  }
  public async findByUserUuid({ uuid, type }: IFindByUserIdProps): Promise<TNetworkSchema> {
    return await this.repo.findOne({
      where: {
        userUuid: uuid.uuid,
        network: type,
      },
    })
  }
}
export default NetworkService
