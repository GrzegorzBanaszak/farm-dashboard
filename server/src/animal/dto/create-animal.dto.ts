import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { HealthStatus, Species } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@ApiSchema({ name: 'Utwórzenie zwierzęcia' })
export class CreateAnimalDto {
  @ApiProperty({ description: 'Nazwa zwierzęcia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Species, enumName: 'Gatunek' })
  @IsEnum(Species)
  specie: Species;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'Data urodzenia' })
  birthDate?: Date;

  @IsOptional()
  @ApiProperty({ enum: HealthStatus, enumName: 'Stan zdrowia' })
  @IsEnum(HealthStatus)
  health?: HealthStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Numer zwierzęcia' })
  number: number;
}
