import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FieldDto } from './dto/field.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { plainToInstance } from 'class-transformer';
import { CropService } from 'src/crop/crop.service';
import { DetailFieldDto } from './dto/field-detail.dto';

@Injectable()
export class FieldService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cropService: CropService,
  ) {}

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
    try {
      const field = await this.prisma.field.findUnique({
        where: { id },
      });

      if (!field) throw new NotFoundException('Nie znaleziono pola');

      const fieldDto: DetailFieldDto = plainToInstance(DetailFieldDto, field, {
        excludeExtraneousValues: true,
      });

      fieldDto.currentCropGrowing = await this.cropService.findGrowingCrop(id);

      fieldDto.histroyCrops = await this.cropService.getAllByFieldId(id);

      return fieldDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono pola');
    }
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
      const field = await this.prisma.$transaction(async (prisma) => {
        await prisma.crop.deleteMany({ where: { fieldId: id } });
        const field = await prisma.field.delete({ where: { id } });

        return field;
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

  async getFieldsNumberWhereCropIsGrowing(): Promise<number> {
    const fields = await this.prisma.field.findMany({
      where: {
        crops: {
          some: {
            isGrowing: true,
          },
        },
      },
    });

    return fields.length;
  }
}
