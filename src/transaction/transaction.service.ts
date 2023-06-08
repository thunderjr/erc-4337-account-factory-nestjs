import { getAddress, parseEther } from 'ethers/lib/utils';
import { Injectable, Logger } from '@nestjs/common';
import type { Client } from 'userop';

import { AccountService } from 'src/account/account.service';
import { InjectUserOpsClient } from 'src/constants';
import type {
  SendTransferDto,
  SendTransferTxResponse,
} from './dto/send-transfer.dto';

@Injectable()
export class TransactionService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectUserOpsClient() private readonly userOpsClient: Client,
    private readonly accountService: AccountService,
  ) {}

  async transfer({
    accountId,
    to,
    value,
  }: SendTransferDto): Promise<SendTransferTxResponse> {
    const smartWallet = await this.accountService.getSmartAccount(accountId);
    const toAddress = getAddress(to);
    const amount = parseEther(value.toString());

    const response = await this.userOpsClient.sendUserOperation(
      smartWallet.execute(toAddress, amount, '0x'),
      {
        onBuild: (op) => {
          this.logger.log('Signed UserOperation: ');
          this.logger.log(op);
        },
      },
    );

    return response.wait();
  }
}
