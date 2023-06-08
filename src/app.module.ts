import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { Client } from 'userop';

import { AccountModule } from './account/account.module';
import { USER_OPS_CLIENT_TOKEN } from 'src/constants';
import { TransactionModule } from './transaction/transaction.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: USER_OPS_CLIENT_TOKEN,
      useFactory: (configService: ConfigService) => {
        return Client.init(configService.getOrThrow('RPC_URL'));
      },
      inject: [ConfigService],
    },
  ],
  exports: [USER_OPS_CLIENT_TOKEN],
})
export class AppModule {}
