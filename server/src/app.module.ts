import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { FieldModule } from './field/field.module';
import { AnimalModule } from './animal/animal.module';
import { MachineModule } from './machine/machine.module';

@Module({
  imports: [FieldModule, AnimalModule, MachineModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
