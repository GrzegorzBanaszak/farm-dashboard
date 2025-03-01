import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { ApiTags } from '@nestjs/swagger';
import { FieldDto } from './dto/field.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@ApiTags('Pola uprawne')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  async getAll(): Promise<FieldDto[]> {
    return this.fieldService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<FieldDto> {
    return this.fieldService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateFieldDto): Promise<FieldDto> {
    return this.fieldService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateFieldDto,
  ): Promise<FieldDto> {
    return this.fieldService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<FieldDto> {
    return this.fieldService.delete(id);
  }
}
