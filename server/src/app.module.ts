import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { FieldModule } from './field/field.module';
import { AnimalModule } from './animal/animal.module';
import { MachineModule } from './machine/machine.module';
import { CropModule } from './crop/crop.module';

@Module({
  imports: [FieldModule, AnimalModule, MachineModule, CropModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
