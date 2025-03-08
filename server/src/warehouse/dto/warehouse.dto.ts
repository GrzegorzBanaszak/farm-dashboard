import { Expose } from 'class-transformer';

export class WarehouseDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  address?: string;
  @Expose()
  items?: Array<any>;
}
