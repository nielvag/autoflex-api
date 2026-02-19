import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { ProductRawMaterialsModule } from './product-raw-materials/product-raw-materials.module';
import { ProductionPlanModule } from './production-plan/production-plan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { RawMaterial } from './raw-materials/entities/raw-material.entity';
import { ProductRawMaterial } from './product-raw-materials/entities/product-raw-material.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isTest = process.env.NODE_ENV === 'test';

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),

          entities: [Product, RawMaterial, ProductRawMaterial],
          synchronize: isTest,
          dropSchema: isTest,
          migrationsRun: !isTest,

          // logs
          logging: ['error', 'schema'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
        };
      },
    }),

    ProductModule,
    RawMaterialsModule,
    ProductRawMaterialsModule,
    ProductionPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
