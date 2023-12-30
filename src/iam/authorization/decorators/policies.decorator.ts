import { SetMetadata } from '@nestjs/common';
import { Policy } from '../policies/interfaces/policy.interface';

export const POLICIES_KEY = 'POLICIES';
export const Policies = (...policies: Policy[]) => {
  return SetMetadata(POLICIES_KEY, policies);
};
