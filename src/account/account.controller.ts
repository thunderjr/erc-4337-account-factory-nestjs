import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: { signingKey?: string }) {
    return this.accountService.create(createAccountDto.signingKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Get(':id/address')
  async getAddress(@Param('id') id: string) {
    const smartAccount = await this.accountService.getSmartAccount(id);
    return {
      address: smartAccount.getSender(),
    };
  }
}
