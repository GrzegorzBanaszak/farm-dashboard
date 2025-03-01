import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus, Species } from '@prisma/client';
import {
  IsDate,
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
  specie: Species;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Data urodzenia' })
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'Stan zdrowia' })
  health: HealthStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Numer zwierzęcia' })
  number: number;
}
