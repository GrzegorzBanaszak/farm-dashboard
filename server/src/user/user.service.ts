import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    if (!user) throw new NotFoundException('Nie znaleziono użytkownika');

    return user;
  }
}
