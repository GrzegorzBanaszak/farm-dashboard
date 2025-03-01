import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { FieldModule } from './field/field.module';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [FieldModule, AnimalModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
