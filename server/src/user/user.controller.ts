import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from './interfaces/user.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: IUser) {
    return user;
  }
}
