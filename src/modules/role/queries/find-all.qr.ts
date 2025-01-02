import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { RoleRepo } from '~/cores/repositories'

export default class FindAllRoleQr implements IQuery {}

@QueryHandler(FindAllRoleQr)
export class FindAllRoleHlr implements IQueryHandler<FindAllRoleQr> {
  constructor(private readonly repo: RoleRepo) {}
  async execute() {
    return await this.repo.findAll()
  }
}
