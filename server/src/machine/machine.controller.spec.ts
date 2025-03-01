import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from './machine.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { MachineCondition } from '@prisma/client';
import { UpdateMachineDto } from './dto/update-machine.dto';

describe('Machine Controller', () => {
  let controller: MachineController;
  let id;
  const data: CreateMachineDto = {
    name: 'Maszyna 1',
    condition: MachineCondition.NEW,
    type: 'John Deere',
    purchaseDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineController],
      providers: [MachineService, PrismaService],
    }).compile();

    controller = module.get<MachineController>(MachineController);
  });

  it('Sprawdzenie definicji', () => {
    expect(controller).toBeDefined();
  });

  describe('Pobierz wszystkie maszyny', () => {
    it('powinien pobrać wszystkie maszyny', async () => {
      const result = await controller.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('Dodaj maszyne', () => {
    it('powinien dodac maszyne', async () => {
      const result = await controller.add(data);
      id = result.id;
      expect(result.name).toEqual(data.name);
    });
  });

  describe('Zaktualizuj maszyne', () => {
    it('powinien aktualizowac maszyne', async () => {
      data.name = 'Maszyna 2';
      const machine = await controller.getOne(id);
      const machineToUpdate: UpdateMachineDto = {
        name: data.name,
        type: machine.type,
        purchaseDate: machine.purchaseDate,
        condition: machine.condition,
      };
      const result = await controller.update(id, machineToUpdate);
      expect(result.name).toEqual(data.name);
    });
  });

  describe('Zaktualizuj stan maszyny', () => {
    it('powinien zaktualizowac stan maszyny', async () => {
      const result = await controller.machineConditionUpdate(id, {
        condition: MachineCondition.GOOD,
      });

      expect(result.condition).toEqual(MachineCondition.GOOD);
    });
  });

  describe('Usuń maszyne', () => {
    it('powinien usunac maszyne', async () => {
      const result = await controller.delete(id);
      expect(result.id).toEqual(id);
    });
  });
});
