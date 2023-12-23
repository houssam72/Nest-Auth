import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { ROLES_KEY } from '../../decorators/roles.decorator';
// import { Role } from '../../../../users/enum/role.enum';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator.ts.decorator';
import { PermissionType } from '../permission.type';
import { ActiveUserDataInterface } from '../../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../../iam.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!contextPermissions) {
      return true;
    }
    const user: ActiveUserDataInterface = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextPermissions.every((permission) =>
      user.permissions.includes(permission),
    );
  }
}
