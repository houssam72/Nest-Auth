import { Policy } from './interfaces/policy.interface';
import { Injectable } from '@nestjs/common';
import { ActiveUserDataInterface } from '../../interfaces/active-user-data.interface';
import { PolicyHandlersStorage } from './policy-handlers.storage';
import { PolicyHandler } from './interfaces/policy-handler.interface';

export class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlersStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }
  async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserDataInterface,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@nestjs.com');
    if (!isContributor) {
      throw new Error('Method not implemented');
    }
  }
}
