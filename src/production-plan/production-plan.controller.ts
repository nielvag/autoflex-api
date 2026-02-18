import { Controller, Get } from '@nestjs/common';
import { ProductionPlanService } from './production-plan.service';

@Controller('production-plan')
export class ProductionPlanController {
  constructor(private readonly service: ProductionPlanService) {}

  @Get()
  generate() {
    return this.service.generate();
  }
}
