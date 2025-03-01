import { Module } from '@nestjs/common';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FieldController],
  providers: [FieldService, PrismaService],
})
export class FieldModule {}
