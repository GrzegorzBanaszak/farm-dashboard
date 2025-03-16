import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnimalDto } from './dto/animal.dto';
import { plainToInstance } from 'class-transformer';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { HealthStatus } from '@prisma/client';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<AnimalDto[]> {
    const animals = await this.prisma.animal.findMany();

    if (animals.length === 0) {
      return [];
    }
    const animalDto: AnimalDto[] = plainToInstance(AnimalDto, animals, {
      excludeExtraneousValues: true,
    });

    return animalDto;
  }

  async getOne(id: string): Promise<AnimalDto> {
    try {
      const animal = await this.prisma.animal.findUnique({ where: { id } });
      const animalDto: AnimalDto = plainToInstance(AnimalDto, animal, {
        excludeExtraneousValues: true,
      });
      return animalDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono zwierzęcia');
    }
  }

  async create(data: CreateAnimalDto): Promise<AnimalDto> {
    const animal = await this.prisma.animal.create({
      data: {
        ...data,
        health: data.health ? data.health : HealthStatus.DOSKONALY,
        birthDate: data.birthDate ? data.birthDate : new Date(),
      },
    });
    const animalDto: AnimalDto = plainToInstance(AnimalDto, animal, {
      excludeExtraneousValues: true,
    });
    return animalDto;
  }

  async update(id: string, data: UpdateAnimalDto): Promise<AnimalDto> {
    try {
      const animal = await this.prisma.animal.update({
        where: { id },
        data,
      });
      const animalDto: AnimalDto = plainToInstance(AnimalDto, animal, {
        excludeExtraneousValues: true,
      });
      return animalDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono zwierzeńca');
    }
  }

  async delete(id: string): Promise<AnimalDto> {
    try {
      const animal = await this.prisma.animal.delete({ where: { id } });
      const animalDto: AnimalDto = plainToInstance(AnimalDto, animal, {
        excludeExtraneousValues: true,
      });
      return animalDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono zwierzeńca');
    }
  }

  async healthStatusUpdate(
    id: string,
    status: HealthStatus,
  ): Promise<AnimalDto> {
    try {
      const animal = await this.prisma.animal.update({
        where: { id },
        data: { health: status },
      });
      const animalDto: AnimalDto = plainToInstance(AnimalDto, animal, {
        excludeExtraneousValues: true,
      });
      return animalDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono zwierzeńca');
    }
  }
}
