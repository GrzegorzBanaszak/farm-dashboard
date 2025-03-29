import { ApiProperty } from '@nestjs/swagger';
import { CountType } from 'src/types/CountType';

export default class GetStatsDto {
  @ApiProperty({ description: 'Ilość maszyn' })
  machinesCount: number;
  @ApiProperty({ description: 'Ilość zwierząt' })
  animalsCount: number;
  @ApiProperty({ description: 'Zebrane w tym roku' })
  thisYearYield: number;
  @ApiProperty({ description: 'Obsianych pól' })
  plantedFieldsCount: number;
  @ApiProperty({ description: 'Współczynnik udziału zwierząt' })
  animalsByType: Record<string, CountType>;
  @ApiProperty({ description: 'Współczynnik udziału roslin' })
  cropsByType: Record<string, CountType>;
}
