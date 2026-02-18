import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Decimal from 'decimal.js';

import { Product } from '../products/entities/product.entity';
import {
  ProductionPlanResponseDto,
  ProductionPlanItemDto,
} from './dto/production-plan-response.dto';
import { ProductRawMaterial } from '../product-raw-materials/entities/product-raw-material.entity';

@Injectable()
export class ProductionPlanService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async generate(): Promise<ProductionPlanResponseDto> {
    const SortedProducts = await this.productRepo.find({
      relations: { rawMaterials: { rawMaterial: true } },
      order: { price: 'DESC' },
    });

    const remainingStock = new Map<string, Decimal>();
    for (const p of SortedProducts) {
      for (const link of p.rawMaterials ?? []) {
        const rm = link.rawMaterial;
        if (!rm) continue;

        if (!remainingStock.has(rm.id)) {
          remainingStock.set(rm.id, new Decimal(rm.stockQuantity ?? '0'));
        }
      }
    }

    const items: ProductionPlanItemDto[] = [];
    let grandTotal = new Decimal(0);

    for (const product of SortedProducts) {
      const productRawMaterials = product.rawMaterials ?? [];

      // Se não tem relação com matéria-prima, continua
      if (productRawMaterials.length === 0) continue;

      let maxQtd: Decimal | null = null;

      maxQtd = this.getMaxPossibleQuantityOfProductsFromStock(
        productRawMaterials,
        remainingStock,
      );

      if (!maxQtd || maxQtd.lte(0)) continue;

      const quantity = maxQtd.toNumber();

      // Consome do estoque
      for (const prm of productRawMaterials) {
        const rm = prm.rawMaterial;
        const required = new Decimal(prm.quantityRequired);
        const consumed = required.mul(maxQtd);
        const remaining = remainingStock.get(rm.id) ?? new Decimal(0);
        remainingStock.set(rm.id, remaining.sub(consumed));
      }

      const unitPrice = new Decimal(product.price);
      const total = unitPrice.mul(maxQtd);

      grandTotal = grandTotal.add(total);

      items.push({
        productId: product.id,
        productCode: product.code,
        productName: product.name,
        unitPrice: unitPrice.toFixed(2),
        quantity,
        totalValue: total.toFixed(2),
      });
    }

    return {
      items,
      totalValue: grandTotal.toFixed(2),
    };
  }

  private getMaxPossibleQuantityOfProductsFromStock(
    productsRawMaterials: ProductRawMaterial[],
    remainingStock: Map<string, Decimal>,
  ) {
    let maxQtd: Decimal | null = null;

    for (const prm of productsRawMaterials) {
      const rm = prm.rawMaterial;
      if (!rm) {
        throw new BadRequestException(
          'Não foi possível gerar o plano de produção: matéria-prima não encontrada.',
        );
      }

      const required = new Decimal(prm.quantityRequired ?? '0');
      if (required.lte(0)) {
        maxQtd = new Decimal(0);
        break;
      }

      const remaining = remainingStock.get(rm.id) ?? new Decimal(0);
      const possible = remaining.div(required).floor();

      maxQtd = maxQtd === null ? possible : Decimal.min(maxQtd, possible);

      if (maxQtd.eq(0)) break;
    }

    return maxQtd;
  }
}
