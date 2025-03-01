import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { ApiTags } from '@nestjs/swagger';
import { AnimalDto } from './dto/animal.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { HealthStatus } from '@prisma/client';
import { UpdateAnimalHealthDto } from './dto/update-animal-health.dto';

@ApiTags('Zwierzęta')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async getAll(): Promise<AnimalDto[]> {
    return this.animalService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AnimalDto> {
    return this.animalService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateAnimalDto): Promise<AnimalDto> {
    return this.animalService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateAnimalDto) {
    return this.animalService.update(id, data);
  }

  @Patch(':id/health')
  async healthStatusUpdate(
    @Param('id') id: string,
    @Body() healthStatus: UpdateAnimalHealthDto,
  ): Promise<AnimalDto> {
    return this.animalService.healthStatusUpdate(id, healthStatus.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AnimalDto> {
    return this.animalService.delete(id);
  }
}
