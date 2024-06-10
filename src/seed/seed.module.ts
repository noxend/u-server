import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/categories/category.schema';
import { Risk, RiskSchema } from 'src/risks/risk.schema';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
})
export class SeedModule {}
