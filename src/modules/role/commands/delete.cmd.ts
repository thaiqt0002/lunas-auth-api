import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { BaseIdDto } from '~/cores/dtos'
import { IBaseId } from '~/cores/interfaces'
import { RoleRepo } from '~/cores/repositories'

import RoleService from '../role.service'

export default class DeleteRoleCmd extends BaseIdDto implements ICommand {
  constructor({ id }: IBaseId) {
    super()
    this.id = id
  }
}

@CommandHandler(DeleteRoleCmd)
export class DeleteRoleHlr implements ICommandHandler<IBaseId> {
  constructor(
    private readonly repo: RoleRepo,
    private readonly service: RoleService,
  ) {}
  async execute({ id }: IBaseId) {
    await this.service.assertNotExistById(id)
    await this.repo.deleteById(id)
  }
}
