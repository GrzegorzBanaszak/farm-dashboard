import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from './interfaces/user.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: IUser) {
    return await this.userService.getOne(user.userId);
  }
}
