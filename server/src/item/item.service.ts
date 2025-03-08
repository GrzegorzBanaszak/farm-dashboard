import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemDto, ItemWithWarehouseDto } from './dto/item.dto';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Array<ItemDto>> {
    const data = await this.prisma.item.findMany({});

    const itemDto: ItemDto[] = plainToInstance(ItemDto, data, {
      excludeExtraneousValues: true,
    });
    return itemDto;
  }

  async getOne(id: string): Promise<ItemWithWarehouseDto> {
    try {
      const item = await this.prisma.item.findUnique({
        where: { id },
        include: { warehouse: true },
      });
      const itemDto: ItemWithWarehouseDto = plainToInstance(
        ItemWithWarehouseDto,
        item,
        {
          excludeExtraneousValues: true,
        },
      );
      return itemDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono przedmiotu');
    }
  }

  async add(data: CreateItemDto): Promise<ItemDto> {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: data.warehouseId },
    });

    if (!warehouse) throw new NotFoundException('Nie znaleziono magazynu');

    const item = await this.prisma.item.create({ data });
    const itemDto: ItemDto = plainToInstance(ItemDto, item, {
      excludeExtraneousValues: true,
    });
    return itemDto;
  }

  async update(id: string, data: UpdateItemDto): Promise<ItemDto> {
    try {
      const item = await this.prisma.item.update({
        where: { id },
        data,
      });
      const itemDto: ItemDto = plainToInstance(ItemDto, item, {
        excludeExtraneousValues: true,
      });
      return itemDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się zaktualizować przedmiot');
    }
  }

  async delete(id: string): Promise<ItemDto> {
    try {
      const item = await this.prisma.item.delete({ where: { id } });
      const itemDto: ItemDto = plainToInstance(ItemDto, item, {
        excludeExtraneousValues: true,
      });
      return itemDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się usunąć przedmiot');
    }
  }

  async changeWarehouse(
    id: string,
    warehouseId: string,
  ): Promise<ItemWithWarehouseDto> {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id: warehouseId },
      });

      if (!warehouse) throw new NotFoundException('Nie znaleziono magazynu');

      const item = await this.prisma.item.update({
        where: { id },
        data: { warehouse: { connect: { id: warehouseId } } },
        include: { warehouse: true },
      });
      const itemDto: ItemWithWarehouseDto = plainToInstance(
        ItemWithWarehouseDto,
        item,
        {
          excludeExtraneousValues: true,
        },
      );
      return itemDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się zmienić magazyn');
    }
  }
}
