import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { Client } from 'userop';

import { AccountModule } from './account/account.module';
import {
  ETHERS_PROVIDER_TOKEN,
  USER_OPS_CLIENT_TOKEN,
} from 'src/utils/constants';
import { TransactionModule } from './transaction/transaction.module';
import { providers } from 'ethers';

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
    {
      provide: ETHERS_PROVIDER_TOKEN,
      useFactory: (configService: ConfigService) => {
        return new providers.JsonRpcProvider(
          configService.getOrThrow('RPC_URL'),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [USER_OPS_CLIENT_TOKEN, ETHERS_PROVIDER_TOKEN],
})
export class AppModule {}
