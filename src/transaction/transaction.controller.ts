import { Controller, Post, Body } from '@nestjs/common';

import type { SendTransferDto, ERC20TransferDto } from './dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('transfer')
  transfer(@Body() sendTransferDto: SendTransferDto) {
    return this.transactionService.transfer(sendTransferDto);
  }

  @Post('erc20-transfer')
  erc20Transfer(@Body() erc20TransferDto: ERC20TransferDto) {
    return this.transactionService.transferERC20(erc20TransferDto);
  }
}
