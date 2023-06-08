import { Module } from '@nestjs/common';

import { AccountStorageService } from 'src/account/storage.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, AccountStorageService],
  exports: [AccountService],
})
export class AccountModule {}
