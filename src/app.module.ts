import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'

import Configuration from '~/cores/configs'
import CoresModule from '~/cores/modules/cores.module'

import * as entities from './cores/entities'
import AllTcpExceptionsFilter from './cores/filters/all-tcp.exception.filter'
import ReposModule from './cores/repositories/repository.module'
import AddressModule from './modules/address/address.module'
import BasicAuthenModule from './modules/basic-authen/basic-authen.module'
import { BasicAuthTcpController } from './modules/basic-authen/basic-authen.tcp'
import ContactModule from './modules/contact/contact.module'
import RoleModule from './modules/role/role.module'

@Module({
  imports: [
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env.auth',
      isGlobal: true,
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServ: ConfigService) => {
        return {
          type: 'mysql',
          host: configServ.get<string>('DB.HOST'),
          port: configServ.get<number>('DB.PORT'),
          username: configServ.get<string>('DB.USER'),
          password: configServ.get<string>('DB.PASSWORD'),
          database: 'LUNAS_USER',
          autoLoadEntities: true,
          synchronize: false,
          entities: Object.values(entities),
        }
      },
    }),
    ReposModule,
    CoresModule,
    BasicAuthenModule,
    RoleModule,
    AddressModule,
    ContactModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: AllTcpExceptionsFilter,
    },
  ],
  controllers: [BasicAuthTcpController],
})
export class AppModule {
  constructor() {}
}
