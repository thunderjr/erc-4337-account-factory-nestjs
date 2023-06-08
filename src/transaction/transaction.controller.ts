import { Controller, Post, Body } from '@nestjs/common';

import { SendTransferDto } from './dto/send-transfer.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('transfer')
  create(@Body() sendTransferDto: SendTransferDto) {
    return this.transactionService.transfer(sendTransferDto);
  }
}
