import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FieldDto } from './dto/field.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FieldService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<FieldDto[]> {
    const fields: FieldDto[] = await this.prisma.field.findMany({
      // select: {
      //   id: true,
      //   name: true,
      //   size: true,
      //   location: true,
      // },
    });

    const fieldDto: FieldDto[] = plainToInstance(FieldDto, fields, {
      excludeExtraneousValues: true,
    });
    return fieldDto;
  }

  async getOne(id: string): Promise<FieldDto> {
    const field = await this.prisma.field.findUnique({
      where: { id },
    });

    if (!field) throw new NotFoundException('Nie znaleziono pola');

    const fieldDto: FieldDto = plainToInstance(FieldDto, field, {
      excludeExtraneousValues: true,
    });

    return fieldDto;
  }

  async create(data: CreateFieldDto): Promise<FieldDto> {
    const field = await this.prisma.field.create({ data });
    const fieldDto: FieldDto = plainToInstance(FieldDto, field, {
      excludeExtraneousValues: true,
    });
    return fieldDto;
  }

  async update(id: string, data: UpdateFieldDto): Promise<FieldDto> {
    try {
      const field = await this.prisma.field.update({
        where: { id },
        data,
      });

      const fieldDto: FieldDto = plainToInstance(FieldDto, field, {
        excludeExtraneousValues: true,
      });
      return fieldDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono pola');
    }
  }

  async delete(id: string): Promise<FieldDto> {
    try {
      const field = await this.prisma.field.delete({
        where: { id },
      });
      const fieldDto: FieldDto = plainToInstance(FieldDto, field, {
        excludeExtraneousValues: true,
      });
      return fieldDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono pola');
    }
  }

  async addCrop(id: string, cropId: string): Promise<FieldDto> {
    try {
      const field = await this.prisma.field.update({
        where: { id },
        data: { crops: { connect: { id: cropId } } },
      });
      const fieldDto: FieldDto = plainToInstance(FieldDto, field, {
        excludeExtraneousValues: true,
      });
      return fieldDto;
    } catch (error) {
      throw new NotFoundException('Nie udało się dodać uprawy');
    }
  }
}
