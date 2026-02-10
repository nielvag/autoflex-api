import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { ProductRawMaterialsModule } from './product-raw-materials/product-raw-materials.module';
import { ProductionPlanModule } from './production-plan/production-plan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,

        // logs
        logging: ['error', 'schema'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
    }),

    ProductsModule,
    RawMaterialsModule,
    ProductRawMaterialsModule,
    ProductionPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
