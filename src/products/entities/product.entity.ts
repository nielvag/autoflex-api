import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductRawMaterial } from '../../product-raw-materials/entities/product-raw-material.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30 })
  code: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: string;

  @OneToMany(() => ProductRawMaterial, (prm) => prm.product, {
    cascade: false,
  })
  rawMaterials: ProductRawMaterial[];
}
