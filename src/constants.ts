import { Inject } from '@nestjs/common';

export const USER_OPS_CLIENT_TOKEN = 'USER_OPS_CLIENT_TOKEN';
export const InjectUserOpsClient = () => Inject(USER_OPS_CLIENT_TOKEN);
