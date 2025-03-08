import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAll() {
    return await this.itemService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.itemService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateItemDto) {
    return await this.itemService.add(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return await this.itemService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.itemService.delete(id);
  }
}
