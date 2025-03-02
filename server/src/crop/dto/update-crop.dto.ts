import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CropType } from '@prisma/client';
import {
  IsDate,
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
  @IsString()
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
  harvestAt?: Date;

  @ApiProperty({
    description: 'Zebrana ilość',
  })
  @IsNumber()
  @IsOptional()
  yield?: number;

  @ApiProperty({
    description: 'Id pola',
  })
  @IsString()
  @IsNotEmpty()
  fieldId: string;
}
