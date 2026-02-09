import { Module } from '@nestjs/common';
import { ProductRawMaterialsController } from './product-raw-materials.controller';
import { ProductRawMaterialsService } from './product-raw-materials.service';

@Module({
  controllers: [ProductRawMaterialsController],
  providers: [ProductRawMaterialsService]
})
export class ProductRawMaterialsModule {}
