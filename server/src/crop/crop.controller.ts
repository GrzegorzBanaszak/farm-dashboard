import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropDto } from './dto/crop.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsBoolean } from 'class-validator';

@UseGuards(JwtAuthGuard)
@ApiTags('Zbiory')
@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie zbiory' })
  @ApiOkResponse({
    description: 'Lista wszystkich zbiorów została pomyślnie zwrócona',
    type: [CropDto],
  })
  @ApiQuery({
    name: 'withFields',
    description: 'Czy pobiera pola',
    type: 'boolean',
    required: false,
  })
  async getAll(
    @Query('withFields', new DefaultValuePipe(false), ParseBoolPipe)
    withFields: boolean,
  ): Promise<CropDto[]> {
    return await this.cropService.getAll(withFields);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz jeden zbiór' })
  @ApiParam({
    name: 'id',
    description: 'Identyfikator zbioru',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Zbiór został pomyślnie znaleziony',
    type: CropDto,
  })
  @ApiNotFoundResponse({ description: 'Zbiór nie został znaleziony' })
  async getOne(@Param('id') id: string): Promise<CropDto> {
    return await this.cropService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Dodaj nowy zbiór' })
  @ApiBody({
    description: 'Dane nowego zbioru',
    type: CreateCropDto,
  })
  @ApiCreatedResponse({
    description: 'Zbiór został pomyślnie utworzony',
    type: CropDto,
  })
  async add(@Body() data: CreateCropDto): Promise<CropDto> {
    return await this.cropService.add(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Aktualizuj istniejący zbiór' })
  @ApiParam({
    name: 'id',
    description: 'Identyfikator zbioru do aktualizacji',
    type: 'string',
  })
  @ApiBody({
    description: 'Dane do aktualizacji zbioru',
    type: UpdateCropDto,
  })
  @ApiOkResponse({
    description: 'Zbiór został pomyślnie zaktualizowany',
    type: CropDto,
  })
  @ApiNotFoundResponse({ description: 'Zbiór nie został znaleziony' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCropDto,
  ): Promise<CropDto> {
    return await this.cropService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń zbiór' })
  @ApiParam({
    name: 'id',
    description: 'Identyfikator zbioru do usunięcia',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Zbiór został pomyślnie usunięty',
    type: CropDto,
  })
  @ApiNotFoundResponse({ description: 'Zbiór nie został znaleziony' })
  async delete(@Param('id') id: string): Promise<CropDto> {
    return await this.cropService.delete(id);
  }
}
