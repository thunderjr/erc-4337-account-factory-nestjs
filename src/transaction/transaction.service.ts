import type { Client, IUserOperationBuilder } from 'userop';
import { getAddress, parseEther } from 'ethers/lib/utils';
import { Injectable, Logger } from '@nestjs/common';
import { Contract, providers } from 'ethers';

import { AccountService } from 'src/account/account.service';
import {
  InjectEthersProvider,
  InjectUserOpsClient,
} from 'src/utils/decorators';
import type {
  SendTransferDto,
  ERC20TransferDto,
  SendTransferTxResponse,
} from './dto';
import { ERC20_ABI } from 'src/utils/ERC20_ABI';

@Injectable()
export class TransactionService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectUserOpsClient() private readonly userOpsClient: Client,
    @InjectEthersProvider()
    private readonly ethersProvider: providers.JsonRpcProvider,
    private readonly accountService: AccountService,
  ) {}

  private async sendAndWaitForUserOperation(op: IUserOperationBuilder) {
    const response = await this.userOpsClient.sendUserOperation(op, {
      onBuild: (op) => {
        this.logger.log('Signed UserOperation: ');
        this.logger.log(op);
      },
    });

    return response.wait();
  }

  async transfer({
    accountId,
    to,
    value,
    withPaymaster,
  }: SendTransferDto): Promise<SendTransferTxResponse> {
    const amount = parseEther(value.toString());
    const toAddress = getAddress(to);

    const smartWallet = await this.accountService.getSmartAccount(accountId, {
      withPaymaster,
    });

    return this.sendAndWaitForUserOperation(
      smartWallet.execute(toAddress, amount, '0x'),
    );
  }

  async transferERC20({
    accountId,
    to,
    token,
    value,
    withPaymaster,
  }: ERC20TransferDto): Promise<SendTransferTxResponse> {
    const amount = parseEther(value.toString());
    const tokenAddress = getAddress(token);
    const toAddress = getAddress(to);

    const smartWallet = await this.accountService.getSmartAccount(accountId, {
      withPaymaster,
    });

    const tokenContract = new Contract(
      tokenAddress,
      ERC20_ABI,
      this.ethersProvider,
    );

    return this.sendAndWaitForUserOperation(
      smartWallet.execute(
        tokenContract.address,
        0,
        tokenContract.interface.encodeFunctionData('transfer', [
          toAddress,
          amount,
        ]),
      ),
    );
  }
}
