import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { Repository } from 'typeorm';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepo: Repository<RawMaterial>,
  ) {}

  async create(dto: CreateRawMaterialDto) {
    const exists = await this.rawMaterialRepo.exists({
      where: { code: dto.code },
    });
    if (exists) throw new ConflictException('Código já utilizado');

    return this.rawMaterialRepo.save(this.rawMaterialRepo.create(dto));
  }

  //todo: add pagination
  findAll() {
    return this.rawMaterialRepo.find();
  }

  async findOne(id: string) {
    const rawMaterial = await this.rawMaterialRepo.findOne({ where: { id } });

    if (!rawMaterial)
      throw new NotFoundException('Matéria prima não encontrada');

    return rawMaterial;
  }

  async update(id: string, dto: UpdateRawMaterialDto) {
    const rawMaterial = await this.findOne(id);

    if (dto.code && dto.code !== rawMaterial.code) {
      const exists = await this.rawMaterialRepo.exists({
        where: { code: dto.code },
      });
      if (exists) throw new ConflictException('Código já utilizado');
    }

    Object.assign(rawMaterial, dto);
    return this.rawMaterialRepo.save(rawMaterial);
  }

  async remove(id: string) {
    const rawMaterial = await this.findOne(id);

    const hasDependency = await this.rawMaterialRepo
      .createQueryBuilder('rm')
      .innerJoin('rm.products', 'product')
      .where('rm.id = :id', { id })
      .getExists();

    if (hasDependency)
      return {
        deleted: false,
        reason:
          'Matéria-prima não pode ser excluída pois está vinculada à produto(s).',
      };

    await this.rawMaterialRepo.remove(rawMaterial);
    return { deleted: true };
  }
}
