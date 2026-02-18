import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductRawMaterialsService } from './product-raw-materials.service';
import { ProductRawMaterialDto } from './dto/product-raw-material.dto';

@Controller('products/:productId/raw-materials')
export class ProductRawMaterialsController {
  constructor(
    private readonly productRawMaterialsService: ProductRawMaterialsService,
  ) {}

  @Get()
  list(@Param('productId') productId: string) {
    return this.productRawMaterialsService.listByProduct(productId);
  }

  @Post()
  updateOrInsert(
    @Param('productId') productId: string,
    @Body() dto: ProductRawMaterialDto,
  ) {
    return this.productRawMaterialsService.updateOrInsert(
      productId,
      dto.rawMaterialId,
      dto.quantityRequired,
    );
  }

  @Delete(':rawMaterialId')
  remove(
    @Param('productId') productId: string,
    @Param('rawMaterialId') rawMaterialId: string,
  ) {
    return this.productRawMaterialsService.remove(productId, rawMaterialId);
  }
}
