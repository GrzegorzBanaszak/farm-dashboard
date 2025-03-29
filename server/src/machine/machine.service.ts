import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MachineDto } from './dto/machine.dto';
import { plainToInstance } from 'class-transformer';
import { CreateMachineDto } from './dto/create-machine.dto';
import { MachineCondition } from '@prisma/client';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<MachineDto[]> {
    const machines = await this.prisma.machine.findMany();

    const machineDto: MachineDto[] = plainToInstance(MachineDto, machines, {
      excludeExtraneousValues: true,
    });

    return machineDto;
  }

  async getOne(id: string): Promise<MachineDto> {
    try {
      const machine = await this.prisma.machine.findUnique({ where: { id } });
      const machineDto: MachineDto = plainToInstance(MachineDto, machine, {
        excludeExtraneousValues: true,
      });
      return machineDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono maszyny');
    }
  }

  async add(data: CreateMachineDto): Promise<MachineDto> {
    const machine = await this.prisma.machine.create({
      data: {
        ...data,
        purchaseDate: data.purchaseDate ? data.purchaseDate : new Date(),
        condition: data.condition ? data.condition : MachineCondition.NEW,
      },
    });
    const machineDto: MachineDto = plainToInstance(MachineDto, machine, {
      excludeExtraneousValues: true,
    });
    return machineDto;
  }

  async update(id: string, data: UpdateMachineDto): Promise<MachineDto> {
    try {
      const machine = await this.prisma.machine.update({
        where: { id },
        data,
      });
      const machineDto: MachineDto = plainToInstance(MachineDto, machine, {
        excludeExtraneousValues: true,
      });
      return machineDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono maszyny');
    }
  }

  async delete(id: string): Promise<MachineDto> {
    try {
      const machine = await this.prisma.machine.delete({ where: { id } });
      const machineDto: MachineDto = plainToInstance(MachineDto, machine, {
        excludeExtraneousValues: true,
      });
      return machineDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono maszyny');
    }
  }

  async healthStatusUpdate(
    id: string,
    status: MachineCondition,
  ): Promise<MachineDto> {
    try {
      const machine = await this.prisma.machine.update({
        where: { id },
        data: { condition: status },
      });
      const machineDto: MachineDto = plainToInstance(MachineDto, machine, {
        excludeExtraneousValues: true,
      });
      return machineDto;
    } catch (error) {
      throw new NotFoundException('Nie znaleziono maszyny');
    }
  }

  async countMachines(): Promise<number> {
    const count = await this.prisma.machine.count();
    return count;
  }
}
