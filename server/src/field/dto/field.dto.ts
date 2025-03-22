import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FieldDto {
  @Expose()
  @ApiProperty({
    description: 'Id pola',
  })
  id: string;
  @Expose()
  @ApiProperty({
    description: 'Nazwa pola',
  })
  name: string;
  @ApiProperty({
    description: 'Wymiar w m2',
  })
  @Expose()
  size: number;
  @ApiProperty({
    description: 'Lokalizacja pola',
  })
  @Expose()
  location: string;
}
