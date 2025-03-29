import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { MachineModule } from 'src/machine/machine.module';
import { CropModule } from 'src/crop/crop.module';
import { AnimalModule } from 'src/animal/animal.module';
import { FieldModule } from 'src/field/field.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [MachineModule, CropModule, AnimalModule, FieldModule],
})
export class StatsModule {}
