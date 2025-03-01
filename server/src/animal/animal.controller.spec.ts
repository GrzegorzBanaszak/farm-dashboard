import { Test, TestingModule } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { HealthStatus, Species } from '@prisma/client';

describe('Animal Controller', () => {
  let controller: AnimalController;
  let prisma: PrismaService;

  let createdMockAnimalId;
  const mockAnimal: CreateAnimalDto = {
    name: 'test',
    specie: Species.CHICKEN,
    health: HealthStatus.EXCELLENT,
    number: 1,
  };

  const mockAnimalService = {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    healthStatusUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [AnimalService, PrismaService],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Kontroler animal powinien być zdefiniowany', () => {
    expect(controller).toBeDefined();
  });

  describe('Pobierz zwierzeta', () => {
    it('powinien zwracać listę zwierząt', async () => {
      const result = await controller.getAll();
      console.log(result);
      expect(result).toEqual([]);
    });
  });

  describe('Dodaj zwierze', () => {
    it('powinien tworzyć nowy zwierzę', async () => {
      const result = await controller.create(mockAnimal);
      createdMockAnimalId = result.id;
      expect(result.name).toEqual(mockAnimal.name);
      expect(result.specie).toEqual(mockAnimal.specie);
    });
  });

  describe('Zaktualizuj zwierze', () => {
    it('powinien aktualizować zwierzę', async () => {
      mockAnimal.name = 'Animal 2';
      mockAnimal.health = HealthStatus.GOOD;
      const animal = await controller.getOne(createdMockAnimalId);
      const result = await controller.update(animal.id, {
        name: 'Animal 2',
        specie: animal.specie,
        birthDate: animal.birthDate,
        health: HealthStatus.GOOD,
        number: animal.number,
      });
      expect(result.name).toEqual(mockAnimal.name);
      expect(result.specie).toEqual(mockAnimal.specie);
    });
  });

  describe('Zaktualizuj stan zdrowia', () => {
    it('powinien zwracać zwierzę', async () => {
      mockAnimal.health = HealthStatus.GOOD;
      const animal = await controller.healthStatusUpdate(createdMockAnimalId, {
        status: HealthStatus.GOOD,
      });
      expect(animal.health).toEqual(HealthStatus.GOOD);
    });
  });

  describe('Usuń zwierze', () => {
    it('powinien usuwać zwierzę', async () => {
      const result = await controller.delete(createdMockAnimalId);
      expect(result.name).toEqual(mockAnimal.name);
      expect(result.specie).toEqual(mockAnimal.specie);
    });
  });
});
