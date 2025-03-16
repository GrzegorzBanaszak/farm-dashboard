import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { HealthStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

@ApiSchema({ name: 'Aktualizacja stanu zdrowia' })
export class UpdateAnimalHealthDto {
  @IsNotEmpty()
  @ApiProperty({ enum: HealthStatus, enumName: 'Stan zdrowia' })
  @IsEnum(HealthStatus)
  status: HealthStatus;
}
