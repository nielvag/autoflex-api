import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RawMaterial } from '../../raw-materials/entities/raw-material.entity';

@Entity({ name: 'product_raw_material' })
@Index(['productId', 'rawMaterialId'], { unique: true })
export class ProductRawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'raw_material_id', type: 'uuid' })
  rawMaterialId: string;

  @Column({
    name: 'quantity_required',
    type: 'numeric',
    precision: 14,
    scale: 3,
  })
  quantityRequired: string;

  @ManyToOne(() => Product, (prod) => prod.rawMaterials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => RawMaterial, (rm) => rm.products, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;
}
