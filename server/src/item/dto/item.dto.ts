import { Expose } from 'class-transformer';
import { WarehouseDto } from 'src/warehouse/dto/warehouse.dto';

export class ItemDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  description?: string;
  @Expose()
  quantity: number;
}

export class ItemWithWarehouseDto extends ItemDto {
  @Expose()
  warehouse: WarehouseDto;
}
