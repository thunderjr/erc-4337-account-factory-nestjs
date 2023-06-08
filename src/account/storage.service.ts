import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

import { Account } from 'src/account/account.entity';

@Injectable()
export class AccountStorageService {
  private readonly databaseFile = 'data/accounts.json';
  private accounts: Account[] = [];

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      const fileContents = await fs.readFile(this.databaseFile);
      this.accounts = JSON.parse(fileContents.toString());
    } catch (error) {
      this.accounts = [];
    }
  }

  async getAccountById(id: string): Promise<Account | null> {
    const account = this.accounts.find((a) => a.id === id);
    return Account.load(account) || null;
  }

  async saveAccount(account: Account): Promise<Account> {
    this.accounts.push(account);
    await this.saveDatabase();
    return account;
  }

  private async saveDatabase() {
    await fs.writeFile(this.databaseFile, JSON.stringify(this.accounts));
  }
}
