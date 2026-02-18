import { Module } from '@nestjs/common';
import { ProductRawMaterialsController } from './product-raw-materials.controller';
import { ProductRawMaterialsService } from './product-raw-materials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRawMaterial } from './entities/product-raw-material.entity';
import { ProductModule } from '../products/products.module';
import { RawMaterialsModule } from '../raw-materials/raw-materials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRawMaterial]),
    ProductModule,
    RawMaterialsModule,
  ],
  controllers: [ProductRawMaterialsController],
  providers: [ProductRawMaterialsService],
})
export class ProductRawMaterialsModule {}
