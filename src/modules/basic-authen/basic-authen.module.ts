import { Module } from '@nestjs/common'

import UserModule from '~/modules/user/user.module'

import { BasicAuthTcpController } from './basic-authen.tcp'
import { BasicAuthenSignInHandler, BasicAuthenSignOutHandler, BasicAuthGoogleHlr, BasicAuthSignUpHlr } from './commands'
import { SignUpListener } from './listeners/basic-authen.listener'
import { BasicAuthenRefreshQueryHandler, BasicAuthenVerifyHandler, GetMeHandler } from './queries'
import UserService from '../user/user.service'

@Module({
  imports: [UserModule],
  providers: [
    SignUpListener,
    GetMeHandler,
    BasicAuthenRefreshQueryHandler,
    BasicAuthenVerifyHandler,
    BasicAuthSignUpHlr,
    BasicAuthenSignInHandler,
    BasicAuthenSignOutHandler,
    BasicAuthGoogleHlr,
    UserService,
  ],
  controllers: [BasicAuthTcpController],
})
class BasicAuthenModule {}
export default BasicAuthenModule
