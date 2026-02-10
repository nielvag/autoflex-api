import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductRawMaterial } from '../../product-raw-materials/entities/product-raw-material.entity';

@Entity({ name: 'raw-material' })
export class RawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30 })
  code: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({
    name: 'stock_quantity',
    type: 'numeric',
    precision: 14,
    scale: 3,
    default: 0,
  })
  stockQuantity: string;

  @OneToMany(() => ProductRawMaterial, (prm) => prm.rawMaterial, {
    cascade: false,
  })
  products: ProductRawMaterial[];
}
