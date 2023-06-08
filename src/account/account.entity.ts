import { randomBytes } from 'ethers/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from 'ethers';

export class Account {
  id: string;
  address: string;
  signer: Wallet;

  constructor(public readonly signingKey?: string, id?: string) {
    this.id = id || uuidv4();

    this.signer = new Wallet(this.signingKey || randomBytes(32));
    this.signingKey = this.signer._signingKey().privateKey;
  }

  static load(account: Account): Account {
    return new Account(account.signingKey, account.id);
  }
}
