import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WarehouseDto } from './dto/warehouse.dto';
import { plainToInstance } from 'class-transformer';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ItemDto } from 'src/item/dto/item.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Array<WarehouseDto>> {
    const data = await this.prisma.warehouse.findMany({});
    const warehouseDto: WarehouseDto[] = plainToInstance(WarehouseDto, data, {
      excludeExtraneousValues: true,
    });
    return warehouseDto;
  }

  async getOne(id: string): Promise<WarehouseDto> {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id },
      });
      const warehouseDto: WarehouseDto = plainToInstance(
        WarehouseDto,
        warehouse,
        {
          excludeExtraneousValues: true,
        },
      );

      return warehouseDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono magazynu');
    }
  }

  async getWarehouseItems(id: string): Promise<Array<ItemDto>> {
    try {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!warehouse) throw new NotFoundException('Nie znaleziono magazynu');
      const warehouseItemsDto = plainToInstance(ItemDto, warehouse.items, {
        excludeExtraneousValues: true,
      });

      return warehouseItemsDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono przedmiotów');
    }
  }

  async add(data: CreateWarehouseDto) {
    const warehouse = await this.prisma.warehouse.create({ data });
    const warehouseDto: WarehouseDto = plainToInstance(
      WarehouseDto,
      warehouse,
      {
        excludeExtraneousValues: true,
      },
    );

    return warehouseDto;
  }

  async update(id: string, data: UpdateWarehouseDto) {
    try {
      const warehouse = await this.prisma.warehouse.update({
        where: { id },
        data,
      });
      const warehouseDto: WarehouseDto = plainToInstance(
        WarehouseDto,
        warehouse,
        {
          excludeExtraneousValues: true,
        },
      );
      return warehouseDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się zaktualizować magazynu');
    }
  }

  async delete(id: string) {
    try {
      const items = await this.prisma.item.findMany({
        where: { warehouseId: id },
      });
      if (items.length !== 0)
        throw new NotFoundException('Magazyn nie jest pusty');

      const warehouse = await this.prisma.warehouse.delete({ where: { id } });
      const warehouseDto: WarehouseDto = plainToInstance(
        WarehouseDto,
        warehouse,
        {
          excludeExtraneousValues: true,
        },
      );
      return warehouseDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się usunąć magazynu');
    }
  }
}
