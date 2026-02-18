import { IsNotEmpty, IsUUID, IsNumberString, Matches } from 'class-validator';

export class ProductRawMaterialDto {
  @IsUUID()
  @IsNotEmpty()
  rawMaterialId: string;

  @IsNumberString()
  @Matches(/^\d+(\.\d{1,3})?$/, {
    message: 'Quantidade deve ter 3 casas decimais',
  })
  quantityRequired: string;
}
