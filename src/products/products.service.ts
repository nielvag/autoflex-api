import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const exists = await this.ProductRepo.exists({ where: { code: dto.code } });

    if (exists) {
      throw new ConflictException('Código do produto já existe');
    }

    const product = this.ProductRepo.create(dto);
    await this.ProductRepo.save(product);
  }

  //todo: add pagination later
  findAll() {
    return this.ProductRepo.find({
      relations: { rawMaterials: { rawMaterial: true } },
    });
  }

  async findOne(id: string) {
    const product = await this.ProductRepo.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Produto não encontrado');

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Produto não encontrado');

    if (dto.code && dto.code !== product.code) {
      const exists = await this.ProductRepo.exists({
        where: { code: dto.code },
      });

      if (exists) throw new ConflictException('Código do produto já existe');
    }

    Object.assign(product, dto);
    return this.ProductRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.ProductRepo.remove(product);
    return { deleted: true };
  }
}
