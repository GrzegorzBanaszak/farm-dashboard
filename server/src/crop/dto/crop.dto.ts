import { ApiProperty } from '@nestjs/swagger';
import { CropType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FieldDto } from 'src/field/dto/field.dto';

export class CropDto {
  @ApiProperty({ description: 'Id zbioru' })
  @Expose()
  id: string;

  @ApiProperty({
    enumName: 'Typ rośliny',
    enum: CropType,
    description: 'Typ rośliny',
  })
  @Expose()
  type: CropType;

  @ApiProperty({ description: 'Zasiano', type: Date })
  @Expose()
  plantedAt: Date;

  @ApiProperty({ description: 'Zebrano', type: Date })
  @Expose()
  harvestedAt?: Date;

  @ApiProperty({ description: 'Ilość zebrana' })
  @Expose()
  yield?: number;

  @ApiProperty({ description: 'Czy jest w trakcie zasiewu' })
  @Expose()
  isGrowing: boolean;

  @ApiProperty({ description: 'Pole', type: FieldDto })
  @Expose()
  @ValidateNested()
  @Type(() => FieldDto)
  field?: FieldDto;
}
