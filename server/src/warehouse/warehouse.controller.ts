import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseDto } from './dto/warehouse.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ItemDto } from '../item/dto/item.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async getAll(): Promise<Array<WarehouseDto>> {
    return await this.warehouseService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<WarehouseDto> {
    return await this.warehouseService.getOne(id);
  }

  @Get(':id/items')
  async getItems(@Param('id') id: string): Promise<Array<ItemDto>> {
    return await this.warehouseService.getWarehouseItems(id);
  }

  @Post()
  async add(@Body() data: CreateWarehouseDto): Promise<WarehouseDto> {
    return await this.warehouseService.add(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<WarehouseDto> {
    return await this.warehouseService.delete(id);
  }
}
