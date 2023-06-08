import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';

import { AccountStorageService } from 'src/account/storage.service';
import { Account } from 'src/account/account.entity';
import { SimpleAccount } from 'userop/dist/preset/builder';

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly storageService: AccountStorageService,
  ) {}

  create(signingKey?: string) {
    const account = new Account(signingKey);
    return this.storageService.saveAccount(account);
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.storageService.getAccountById(id);
    if (!account) throw new NotFoundException();
    return account;
  }

  async getSmartAccount(id: string) {
    const account = await this.findOne(id);

    return SimpleAccount.init(
      account.signer,
      this.configService.getOrThrow('RPC_URL'),
    );
  }
}
