import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { ProductRawMaterialsModule } from './product-raw-materials/product-raw-materials.module';
import { ProductionPlanModule } from './production-plan/production-plan.module';

@Module({
  imports: [
    ProductsModule,
    RawMaterialsModule,
    ProductRawMaterialsModule,
    ProductionPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
