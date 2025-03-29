import { Injectable } from '@nestjs/common';
import { AnimalService } from 'src/animal/animal.service';
import { CropService } from 'src/crop/crop.service';
import { FieldService } from 'src/field/field.service';
import { MachineService } from 'src/machine/machine.service';
import GetStatsDto from './dto/get-stats.dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly machineService: MachineService,
    private readonly fiedService: FieldService,
    private readonly cropService: CropService,
    private readonly animalService: AnimalService,
  ) {}

  async getStats(): Promise<any> {
    const machinesCount = await this.machineService.countMachines();
    const animalsCount = await this.animalService.countAnimals();
    const thisYearYield = await this.cropService.getYieldByYear(
      new Date().getFullYear(),
    );
    const plantedFieldsCount =
      await this.fiedService.getFieldsNumberWhereCropIsGrowing();

    const animalsByType = await this.animalService.aggregateAnimalsByType();
    const cropsByType = await this.cropService.groupCropsByType();

    const dto: GetStatsDto = {
      machinesCount,
      animalsCount,
      thisYearYield,
      plantedFieldsCount,
      animalsByType,
      cropsByType,
    };
    return dto;
  }
}
