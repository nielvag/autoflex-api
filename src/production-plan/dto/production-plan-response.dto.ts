export class ProductionPlanItemDto {
  productId: string;
  productCode: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  totalValue: string;
}

export class ProductionPlanResponseDto {
  items: ProductionPlanItemDto[];
  totalValue: string;
}
