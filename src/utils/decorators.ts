import { Inject } from '@nestjs/common';

import {
  ETHERS_PROVIDER_TOKEN,
  USER_OPS_CLIENT_TOKEN,
} from 'src/utils/constants';

export const InjectUserOpsClient = () => Inject(USER_OPS_CLIENT_TOKEN);
export const InjectEthersProvider = () => Inject(ETHERS_PROVIDER_TOKEN);
