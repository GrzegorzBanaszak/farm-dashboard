import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CropDto } from 'src/crop/dto/crop.dto';
import { FieldDto } from './field.dto';

export class DetailFieldDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  size: number;
  @Expose()
  location: string;
  @Expose()
  @ValidateNested()
  @Type(() => FieldDto)
  histroyCrops: Array<CropDto>;
  @Expose()
  @ValidateNested()
  @Type(() => FieldDto)
  currentCropGrowing: CropDto;
}
