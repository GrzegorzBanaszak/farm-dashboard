import { Module } from '@nestjs/common';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CropModule } from 'src/crop/crop.module';

@Module({
  imports: [PrismaModule, CropModule],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
