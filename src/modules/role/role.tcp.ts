import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { ICreateRoleParams } from '~/cores/interfaces'

import { CreateRoleCommand, DeleteRoleCmd } from './commands'
import { FindAllRoleQr } from './queries'

@Controller()
export default class RoleTcpController {
  constructor(
    private readonly query: QueryBus,
    private readonly cmd: CommandBus,
  ) {}

  @MessagePattern('roles.find_all')
  async findAll() {
    return await this.query.execute(new FindAllRoleQr())
  }

  @MessagePattern('roles.create')
  async create(@Payload() data: ICreateRoleParams) {
    await this.cmd.execute(new CreateRoleCommand(data))
    return 'Role created successfully'
  }

  @MessagePattern('roles.delete')
  async delete(@Payload('id') id: number) {
    await this.cmd.execute(new DeleteRoleCmd({ id }))
    return 'Role deleted successfully'
  }
}
