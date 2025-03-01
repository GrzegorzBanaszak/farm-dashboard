import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { FieldModule } from './field/field.module';

@Module({
  imports: [FieldModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
