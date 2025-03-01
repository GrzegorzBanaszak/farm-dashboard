import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFieldDto {
  @ApiProperty({ description: 'Nazwa pola' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Wymiar w m2' })
  size: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lokalizacja pola' })
  location: string;
}
