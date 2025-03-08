import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({ description: 'Nazwa magazynu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Lokalizacja magazynu' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
