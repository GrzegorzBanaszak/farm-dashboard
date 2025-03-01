import { ApiProperty } from '@nestjs/swagger';
import { MachineCondition } from '@prisma/client';
import { Expose } from 'class-transformer';

export class MachineDto {
  @Expose()
  @ApiProperty({ description: 'Id maszyny' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'Nazwa maszyny' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'Model maszyny' })
  type: string;

  @Expose()
  @ApiProperty({ description: 'Data zakupu' })
  purchaseDate: Date;

  @Expose()
  @ApiProperty({ enum: MachineCondition, enumName: 'Stan maszyny' })
  condition: MachineCondition;
}
