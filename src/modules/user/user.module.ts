import { Module } from '@nestjs/common'

import { CreateUserHandler } from './commands/create.cmd'
import { DeleteUserHandler } from './commands/delete.cmd'
import { UpdateUserHandler } from './commands/update.cmd'
import { SendOtpEmailListener } from './listeners/send-otp-email.listener'
import { GetAllUserHandler } from './queries/get-all.qr'
import { GetUserAvatarHandler } from './queries/get-avatar.qr'
import { GetUserDetailHandler } from './queries/get-detail.qr'
import { UserController } from './user.controller'
import UserService from './user.service'
import NetworkModule from '../network/network.module'

@Module({
  imports: [NetworkModule],
  providers: [
    SendOtpEmailListener,
    UserService,
    CreateUserHandler,
    GetAllUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    GetUserAvatarHandler,
    GetUserDetailHandler,
  ],
  controllers: [UserController],
})
export default class UserModule {}
