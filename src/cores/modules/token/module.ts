import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import TokenService from './service'

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
class TokenModule {}
export default TokenModule
