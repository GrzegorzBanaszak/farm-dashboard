import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ description: 'Nazwa' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Opis' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Ilość' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Id magazynu' })
  @IsNotEmpty()
  @IsString()
  warehouseId: string;
}
