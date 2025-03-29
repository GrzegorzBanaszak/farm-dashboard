import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CropDto } from './dto/crop.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CountType } from 'src/types/CountType';

@Injectable()
export class CropService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(withFields = false): Promise<CropDto[]> {
    const crops = await this.prisma.crop.findMany({
      include: {
        field: withFields,
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
    try {
      const field = await this.prisma.field.findUnique({
        where: { id: data.fieldId },
      });

      if (!field) throw new NotFoundException('Nie znaleziono pola');

      const isGrowing = data.harvestedAt ? false : true;

      if (isGrowing) {
        const crops = await this.prisma.crop.findMany({
          where: { fieldId: data.fieldId, isGrowing: true },
        });

        if (crops.length > 0) {
          throw new BadRequestException('Pole jest juz zajęte');
        }
      }

      const crop = await this.prisma.crop.create({
        data: {
          ...data,
          isGrowing,
        },
        include: { field: true },
      });

      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: UpdateCropDto) {
    try {
      const crop = await this.prisma.crop.update({
        where: { id },
        data: {
          ...data,
          isGrowing: data.harvestedAt ? false : true,
        },
        include: { field: true },
      });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new BadRequestException('Błąd przy aktualizacji uprawy');
    }
  }

  async delete(id: string): Promise<CropDto> {
    try {
      const crop = await this.prisma.crop.delete({
        where: { id },
        include: { field: true },
      });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new BadRequestException('Nie udało się usunąć uprawy');
    }
  }

  async deleteAllByFieldId(fieldId: string): Promise<boolean> {
    try {
      const crops = await this.prisma.crop.deleteMany({
        where: { fieldId },
      });

      return crops.count > 0 ? true : false;
    } catch (error) {
      throw new BadRequestException('Nie udało się usunąć upraw');
    }
  }

  async findGrowingCrop(fieldId: string): Promise<CropDto> {
    try {
      const crop = await this.prisma.crop.findFirst({
        where: { isGrowing: true, fieldId },
        include: { field: false },
      });
      const cropDto: CropDto = plainToInstance(CropDto, crop, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new InternalServerErrorException('Bład serwera');
    }
  }

  async getAllByFieldId(fieldId: string): Promise<CropDto[]> {
    try {
      const crops = await this.prisma.crop.findMany({
        where: { fieldId },
        include: { field: false },
      });
      const cropDto: CropDto[] = plainToInstance(CropDto, crops, {
        excludeExtraneousValues: true,
      });
      return cropDto;
    } catch (error) {
      throw new InternalServerErrorException('Bład serwera');
    }
  }

  async getYieldByYear(year: number): Promise<number> {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const yieldNumber = await this.prisma.crop.aggregate({
      _sum: {
        yield: true,
      },
      where: {
        isGrowing: false,
        harvestedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (!yieldNumber._sum.yield) return 0;

    return yieldNumber._sum.yield;
  }

  async groupCropsByType(): Promise<Record<string, CountType>> {
    const crops = await this.prisma.crop.groupBy({
      by: ['type'],
      _count: {
        id: true,
      },
    });

    return crops.reduce((acc, crop) => {
      acc[crop.type] = {
        name: crop.type,
        count: crop._count.id,
      };
      return acc;
    }, {});
  }
}
