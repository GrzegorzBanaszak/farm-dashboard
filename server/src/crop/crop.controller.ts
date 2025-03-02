import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@ApiTags('Zbiory')
@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  async getAll() {
    return await this.cropService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.cropService.getOne(id);
  }

  @Post()
  async add(@Body() data: CreateCropDto) {
    return await this.cropService.add(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCropDto) {
    return await this.cropService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cropService.delete(id);
  }
}
