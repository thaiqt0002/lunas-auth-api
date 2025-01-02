import { Global, Module } from '@nestjs/common'

import HelperService from './service'

@Global()
@Module({
  providers: [HelperService],
  exports: [HelperService],
})
export default class HelperModule {}
