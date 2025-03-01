import { HealthStatus, Species } from '@prisma/client';
import { Expose } from 'class-transformer';

export class AnimalDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  specie: Species;

  @Expose()
  birthDate: Date;

  @Expose()
  health: HealthStatus;

  @Expose()
  number: number;
}
