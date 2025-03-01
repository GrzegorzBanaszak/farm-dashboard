import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ description: 'Nazwa pola' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Wymiar w m2' })
  @Expose()
  size: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lokalizacja pola' })
  @Expose()
  location: string;
}
