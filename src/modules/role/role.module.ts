import { Module } from '@nestjs/common'

import { CreateRoleHandler, DeleteRoleHlr } from './commands'
import { FindAllRoleHlr } from './queries'
import RoleService from './role.service'
import RoleTcpController from './role.tcp'

@Module({
  providers: [FindAllRoleHlr, CreateRoleHandler, DeleteRoleHlr, RoleService],
  controllers: [RoleTcpController],
})
class RoleModule {}
export default RoleModule
