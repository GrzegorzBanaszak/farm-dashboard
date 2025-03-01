import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MachineController],
  providers: [MachineService, PrismaService],
})
export class MachineModule {}
