import { Expose } from 'class-transformer';

export class FieldDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  size: number;
  @Expose()
  location: string;
}
