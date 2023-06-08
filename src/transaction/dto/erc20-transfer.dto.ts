export class ERC20TransferDto {
  accountId: string;
  token: string;
  to: string;
  value: number;
  withPaymaster?: boolean = false;
}
