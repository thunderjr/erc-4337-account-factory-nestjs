import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Presets } from 'userop';

import { AccountStorageService } from 'src/account/storage.service';
import { SimpleAccount } from 'userop/dist/preset/builder';
import { Account } from 'src/account/account.entity';

type WithPaymasterProp = {
  withPaymaster: boolean;
};

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

  async getSmartAccount(id: string, options?: WithPaymasterProp) {
    const account = await this.findOne(id);

    const paymasterRpcUrl = this.configService.get('PAYMASTER_URL');
    const paymasterMiddleware =
      options.withPaymaster && paymasterRpcUrl
        ? Presets.Middleware.verifyingPaymaster(paymasterRpcUrl, {
            chainId: 5,
          })
        : undefined;

    return SimpleAccount.init(
      account.signer,
      this.configService.getOrThrow('RPC_URL'),
      {
        paymasterMiddleware,
      },
    );
  }
}
