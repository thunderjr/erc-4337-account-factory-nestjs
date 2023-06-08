export class SendTransferDto {
  accountId: string;
  to: string;
  value: number;
  withPaymaster?: boolean = false;
}
