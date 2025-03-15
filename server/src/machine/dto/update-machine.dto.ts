import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MachineCondition } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@ApiSchema({ name: 'Aktualizacja maszyny' })
export class UpdateMachineDto {
  @ApiProperty({ description: 'Nazwa maszyny' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Model maszyny' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Data zakupu' })
  @IsOptional()
  @IsDate()
  purchaseDate: Date;

  @IsOptional()
  @ApiProperty({ enum: MachineCondition, enumName: 'Stan maszyny' })
  @IsEnum(MachineCondition)
  condition: MachineCondition;
}
