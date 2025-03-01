import { ApiProperty } from '@nestjs/swagger';
import { MachineCondition } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class MachineConditionUpdateDto {
  @IsNotEmpty()
  @ApiProperty({ enum: MachineCondition, enumName: 'Stan maszyny' })
  condition: MachineCondition;
}
