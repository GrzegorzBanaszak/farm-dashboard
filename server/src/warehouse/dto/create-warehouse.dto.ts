import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'Nazwa magazynu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Lokalizacja magazynu' })
  @IsString()
  @IsOptional()
  address?: string;
}
