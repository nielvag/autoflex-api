import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductionPlanController } from './production-plan.controller';
import { ProductionPlanService } from './production-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductionPlanController],
  providers: [ProductionPlanService],
})
export class ProductionPlanModule {}
