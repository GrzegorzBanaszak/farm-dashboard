import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { FieldModule } from './field/field.module';
import { AnimalModule } from './animal/animal.module';
import { MachineModule } from './machine/machine.module';
import { CropModule } from './crop/crop.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FieldModule, AnimalModule, MachineModule, CropModule, WarehouseModule, ItemModule, UserModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
