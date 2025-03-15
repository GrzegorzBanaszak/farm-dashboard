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
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachineConditionUpdateDto } from './dto/machine-condition-update.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MachineDto } from './dto/machine.dto';

@ApiTags('Maszyny')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie maszyny' })
  @ApiResponse({
    status: 200,
    description: 'Lista maszyn',
    type: [MachineDto],
  })
  async getAll(): Promise<MachineDto[]> {
    return await this.machineService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz maszyne po ID' })
  @ApiParam({ name: 'id', description: 'ID maszyny' })
  @ApiResponse({
    status: 200,
    description: 'Maszyna została znaleziona',
    type: MachineDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Maszyna nie została znaleziona',
  })
  async getOne(@Param('id') id: string): Promise<MachineDto> {
    return await this.machineService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Utwórzenie maszyny' })
  @ApiBody({ type: CreateMachineDto })
  @ApiResponse({
    status: 201,
    description: 'Maszyna została utworzona',
    type: MachineDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Nieprawidłowe dane',
  })
  async add(@Body() data: CreateMachineDto): Promise<MachineDto> {
    return await this.machineService.add(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Aktualizuj maszyne' })
  @ApiParam({ name: 'id', description: 'ID maszyny' })
  @ApiBody({ type: UpdateMachineDto })
  @ApiResponse({
    status: 200,
    description: 'Maszyna została zaktualizowana',
    type: MachineDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Maszyna nie została zaktualizowana',
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateMachineDto,
  ): Promise<MachineDto> {
    return await this.machineService.update(id, data);
  }

  @ApiOperation({ summary: 'Usuwanie maszyne' })
  @ApiParam({ name: 'id', description: 'ID maszyny' })
  @ApiResponse({
    status: 200,
    description: 'Maszyna została zaktualizowana',
    type: MachineDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Maszyna nie została zaktualizowana',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MachineDto> {
    return this.machineService.delete(id);
  }

  @ApiOperation({ summary: 'Aktualizacja stanu maszyny' })
  @ApiParam({ name: 'id', description: 'ID maszyny' })
  @ApiBody({ type: MachineConditionUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Stan maszyny został zaktualizowany',
    type: MachineDto,
  })
  @Patch(':id/condition')
  async machineConditionUpdate(
    @Param('id') id: string,
    @Body() machineStatus: MachineConditionUpdateDto,
  ): Promise<MachineDto> {
    return this.machineService.healthStatusUpdate(id, machineStatus.condition);
  }
}
