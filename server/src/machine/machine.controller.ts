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

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  async getAll() {
    return this.machineService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.machineService.getOne(id);
  }

  @Post()
  async add(@Body() data: CreateMachineDto) {
    return this.machineService.add(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMachineDto) {
    return this.machineService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.machineService.delete(id);
  }

  @Patch(':id/:status')
  async machineConditionUpdate(
    @Param('id') id: string,
    @Body() machineStatus: MachineConditionUpdateDto,
  ) {
    return this.machineService.healthStatusUpdate(id, machineStatus.condition);
  }
}
