import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthentificationController } from './authentification/authentification.controller';
import { AuthentificationService } from './authentification/authentification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentification/guards/access-token/access-token.guard';
import { RefreshTokenIdsStorage } from './authentification/refresh-token-ids.storage/refresh-token-ids.storage';
// import { RolesGuard } from './authorization/guards/roles/roles.guard';
// import { PermissionsGuard } from './authorization/guards/permissions.guard';
import { PolicyHandlersStorage } from './authorization/policies/policy-handlers.storage';
import { FrameworkContributorPolicyHandler } from './authorization/policies/framework-contributor.policy';
import { PoliciesGuard } from './authorization/guards/policies.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionsGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    RefreshTokenIdsStorage,
    AuthentificationService,
    PolicyHandlersStorage,
    FrameworkContributorPolicyHandler,
  ],
  controllers: [AuthentificationController],
})
export class IamModule {}
