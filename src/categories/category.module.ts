import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Risk, RiskSchema } from 'src/risks/risk.schema';
import { CategoryLoader } from './category.dataloader';
import { CategoryResolver } from './category.resolver';
import { Category, CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
  providers: [CategoryService, CategoryResolver, CategoryLoader],
  exports: [CategoryLoader],
})
export class CategoryModule {}
