import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { Public } from './decorators/authPublic.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Public()
@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
