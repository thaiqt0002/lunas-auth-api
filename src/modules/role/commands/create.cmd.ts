import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { ERole, ICreateRoleParams, Prettify } from '~/cores/interfaces'
import { RoleRepo } from '~/cores/repositories'

import { CreateRoleParamsDto } from '../dtos/create.dto'
import RoleService from '../role.service'

export default class CreateRoleCommand extends CreateRoleParamsDto implements ICommand {
  constructor({ name }: Prettify<ICreateRoleParams>) {
    super()
    this.name = name
  }
}

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<ICreateRoleParams> {
  constructor(
    private readonly repo: RoleRepo,
    private readonly service: RoleService,
  ) {}
  async execute({ name }: ICreateRoleParams): Promise<void> {
    await this.service.assertExistByName(name)
    await this.create(name)
  }
  private async create(name: ERole): Promise<void> {
    const role = this.repo.create({ name })
    await this.repo.save(role)
  }
}
