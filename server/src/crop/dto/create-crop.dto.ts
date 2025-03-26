import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CropType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidObjectId } from 'src/common/decorators/is-valid-object-id.decorator';
import { IsHarvestDateAfterPlantDate } from 'src/common/validators/is-harvest-date-after-plant-date.validator';

export class CreateCropDto {
  @ApiProperty({
    description: 'Nazwa pola',
    enum: CropType,
    enumName: 'Typ rośliny',
  })
  @IsEnum(CropType)
  @IsNotEmpty()
  type: CropType;

  @ApiProperty({
    description: 'Data zasiewu',
  })
  @IsDate()
  @IsNotEmpty()
  plantedAt: Date;

  @ApiProperty({
    description: 'Data zbierania',
  })
  @IsDate()
  @IsOptional()
  @Validate(IsHarvestDateAfterPlantDate)
  @ApiPropertyOptional()
  harvestedAt?: Date;

  @ApiProperty({
    description: 'Zebrana ilość',
  })
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  yield?: number;

  @ApiProperty({
    description: 'Id pola',
  })
  @IsString()
  @IsNotEmpty()
  @IsValidObjectId()
  fieldId: string;
}
