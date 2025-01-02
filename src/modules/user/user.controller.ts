import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { UuidDto } from '~/cores/dtos'

import CreateUserCmd from './commands/create.cmd'
import DeleteUserCmd from './commands/delete.cmd'
import UpdateUserCmd from './commands/update.cmd'
import { UserCreateDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import GetAllUserQr from './queries/get-all.qr'
import GetUserAvatarQr from './queries/get-avatar.qr'
import GetUserDetailQr from './queries/get-detail.qr'
import UserService from './user.service'

@Controller()
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly userService: UserService,
  ) {}

  @MessagePattern('user.get_all')
  async getAll() {
    return await this.queryBus.execute(new GetAllUserQr())
  }

  @MessagePattern('user.get_detail')
  async getDetail(@Payload() uuid: string) {
    return await this.queryBus.execute(new GetUserDetailQr({ uuid }))
  }

  @MessagePattern('user.get_avatar')
  async getAvatar(@Payload() uuid: string) {
    return await this.queryBus.execute(new GetUserAvatarQr({ uuid }))
  }
  @MessagePattern('user.update')
  async update(@Payload() data: { uuid: string } & UpdateUserDto) {
    await this.commandBus.execute(new UpdateUserCmd(data))
    return 'C200_UPDATE_USER_SUCCESSFULLY'
  }

  @MessagePattern('user.create')
  async create(@Payload() data: UserCreateDto) {
    await this.commandBus.execute(new CreateUserCmd(data))
    return 'C200_UPDATE_USER_SUCCESSFULLY'
  }

  @MessagePattern('user.delete')
  async delete(@Payload() data: UuidDto) {
    await this.commandBus.execute(new DeleteUserCmd(data))
    return 'Delete user successfully'
  }

  @MessagePattern('user.emails.otp.get')
  async getEmailsOpt(@Payload() data: { uuid: string; email: string; type: 'GET_OTP' | 'RESET_OTP' }) {
    return await this.userService.getOtpEmail(data)
  }

  @MessagePattern('user.emails.verify')
  async verifyEmailOpt(@Payload() data: { uuid: string; code: string; email: string }) {
    return await this.userService.verifyEmailOpt(data)
  }
}
