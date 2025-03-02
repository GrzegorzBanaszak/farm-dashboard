import { Test, TestingModule } from '@nestjs/testing';
import { CropController } from './crop.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('CropController', () => {
  let controller: CropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [PrismaService],
    }).compile();

    controller = module.get<CropController>(CropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
