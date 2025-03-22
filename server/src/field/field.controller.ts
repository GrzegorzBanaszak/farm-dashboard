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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FieldDto } from './dto/field.dto';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@ApiTags('Pola uprawne')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @ApiOperation({ summary: 'Pobierz wszystkie pola' })
  @ApiOkResponse({
    description: 'Zwraca liste pol',
    type: FieldDto,
    isArray: true,
  })
  @Get()
  async getAll(): Promise<FieldDto[]> {
    return this.fieldService.getAll();
  }

  @ApiOperation({ summary: 'Pobierz pole' })
  @ApiParam({
    name: 'id',
    description: 'ID pola',
    example: '6098f95b8fce6a4e0cbd3e1a',
  })
  @ApiOkResponse({
    description: 'Zwraca pole',
    type: FieldDto,
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<FieldDto> {
    return this.fieldService.getOne(id);
  }

  @ApiOperation({ summary: 'Dodaje pole' })
  @ApiOkResponse({
    description: 'Zwraca dodane pole',
    type: FieldDto,
  })
  @ApiBody({ type: CreateFieldDto })
  @Post()
  async create(@Body() data: CreateFieldDto): Promise<FieldDto> {
    return this.fieldService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Aktualizuje pole' })
  @ApiParam({
    name: 'id',
    description: 'ID pola',
    example: '6098f95b8fce6a4e0cbd3e1a',
  })
  @ApiOkResponse({
    description: 'Zwraca zaktualizowane pole',
    type: FieldDto,
  })
  @ApiBody({ type: UpdateFieldDto })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateFieldDto,
  ): Promise<FieldDto> {
    return this.fieldService.update(id, data);
  }

  @ApiOperation({ summary: 'Usuwa pole wraz z uprawami' })
  @ApiParam({
    name: 'id',
    description: 'ID pola',
    example: '6098f95b8fce6a4e0cbd3e1a',
  })
  @ApiOkResponse({
    description: 'Zwraca usunięte pole',
    type: FieldDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<FieldDto> {
    return this.fieldService.delete(id);
  }
}
