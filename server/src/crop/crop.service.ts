import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CropDto } from './dto/crop.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<CropDto[]> {
    const crops = await this.prisma.crop.findMany({
      include: {
        field: true,
      },
    });

    const cropDto: CropDto[] = plainToInstance(CropDto, crops, {
      excludeExtraneousValues: true,
    });
    return cropDto;
  }

  async getOne(id: string): Promise<CropDto> {
    try {
      const crop = await this.prisma.crop.findUnique({
        where: { id },
        include: {
          field: true,
        },
      });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono uprawy');
    }
  }

  async add(data: CreateCropDto) {
    const field = await this.prisma.field.findUnique({
      where: { id: data.fieldId },
    });

    if (!field) throw new NotFoundException('Nie znaleziono pola');

    const crop = await this.prisma.crop.create({ data });

    const cropDto: CropDto = plainToInstance(CropDto, crop, {
      excludeExtraneousValues: true,
    });
    return crop;
  }

  async update(id: string, data: UpdateCropDto) {
    try {
      const crop = await this.prisma.crop.update({
        where: { id },
        data,
      });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono uprawy');
    }
  }

  async delete(id: string): Promise<CropDto> {
    try {
      const crop = await this.prisma.crop.delete({ where: { id } });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono uprawy');
    }
  }
}
