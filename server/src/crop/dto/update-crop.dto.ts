import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CropType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCropDto {
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
  fieldId: string;
}
