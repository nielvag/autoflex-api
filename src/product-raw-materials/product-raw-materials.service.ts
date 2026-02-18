import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRawMaterial } from './entities/product-raw-material.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/products.service';
import { RawMaterialService } from '../raw-materials/raw-material.service';

@Injectable()
export class ProductRawMaterialsService {
  constructor(
    @InjectRepository(ProductRawMaterial)
    private readonly productRawMaterialRepo: Repository<ProductRawMaterial>,
    private readonly productService: ProductService,
    private readonly rawMaterialService: RawMaterialService,
  ) {}

  async listByProduct(productId: string) {
    await this.productService.findOne(productId);

    return this.productRawMaterialRepo.find({
      where: { productId },
      relations: { rawMaterial: true },
    });
  }

  async updateOrInsert(
    productId: string,
    rawMaterialId: string,
    quantityRequired: string,
  ) {
    await this.productService.findOne(productId);
    await this.rawMaterialService.findOne(rawMaterialId);

    const existing = await this.productRawMaterialRepo.findOne({
      where: { productId, rawMaterialId },
    });

    if (existing) {
      existing.quantityRequired = quantityRequired;
      return this.productRawMaterialRepo.save(existing);
    }

    try {
      return await this.productRawMaterialRepo.save(
        this.productRawMaterialRepo.create({
          productId,
          rawMaterialId,
          quantityRequired,
        }),
      );
    } catch (e) {
      console.log('e: ', e);
      throw new ConflictException('Materia prima já incluída no produto');
    }
  }

  async remove(productId: string, rawMaterialId: string) {
    await this.productService.findOne(productId);

    const existing = await this.productRawMaterialRepo.findOne({
      where: { productId, rawMaterialId },
    });
    if (!existing)
      throw new NotFoundException(
        'Materia prima não encontrada neste produtos',
      );

    await this.productRawMaterialRepo.remove(existing);
    return { deleted: true };
  }
}
