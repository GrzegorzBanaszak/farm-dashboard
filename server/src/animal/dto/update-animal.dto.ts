import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus, Species } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAnimalDto {
  @ApiProperty({ description: 'Nazwa zwierzęcia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Gatunek' })
  @IsEnum(Species)
  specie: Species;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Data urodzenia' })
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'Stan zdrowia' })
  @IsEnum(HealthStatus)
  health: HealthStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Numer zwierzęcia' })
  number: number;
}
