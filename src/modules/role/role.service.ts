import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ERole } from '~/cores/interfaces'
import { RoleRepo } from '~/cores/repositories'

@Injectable()
class RoleService {
  constructor(private readonly repo: RoleRepo) {}
  public async assertExistByName(name: ERole, enableThrow = true): Promise<boolean> {
    const role = await this.repo.findOne({ where: { name } })
    if (role && enableThrow) {
      throw new RpcException(ERRORS.ROLE_ALREADY_EXISTS)
    }
    return Boolean(role)
  }

  public async assertNotExistByName(name: ERole, enableThrow = true): Promise<boolean> {
    const role = await this.repo.findOne({ where: { name } })
    if (!role && enableThrow) {
      throw new RpcException(ERRORS.ROLE_NOT_FOUND)
    }
    return Boolean(role)
  }

  public async assertNotExistById(id: number, enableThrow = true): Promise<boolean> {
    const role = await this.repo.findOneById(id)
    if (!role && enableThrow) {
      throw new RpcException(ERRORS.ROLE_NOT_FOUND)
    }
    return Boolean(role)
  }
}
export default RoleService
