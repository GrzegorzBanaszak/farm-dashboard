import { CropType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { FieldDto } from 'src/field/dto/field.dto';

export class CropDto {
  @Expose()
  id: string;

  @Expose()
  type: CropType;

  @Expose()
  plantedAt: Date;

  @Expose()
  harvestAt?: Date;

  @Expose()
  yield?: number;

  @Expose()
  field: FieldDto;
}
