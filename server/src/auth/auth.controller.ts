import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() registerDto: RegisterDto,
  ): Promise<UserDto> {
    const userData = await this.authService.register(registerDto);

    response.cookie('jwt', userData.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    return userData.user;
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<UserDto> {
    const userData = await this.authService.login(loginDto);
    response.cookie('jwt', userData.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    return userData.user;
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // Usuń cookie JWT
    res.cookie('jwt', '', {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
      domain: 'localhost',
    });

    return { message: 'Wylogowano pomyślnie' };
  }
}
