import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialsController } from './raw-material.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  controllers: [RawMaterialsController],
  providers: [RawMaterialService],
  exports: [RawMaterialService],
})
export class RawMaterialsModule {}
