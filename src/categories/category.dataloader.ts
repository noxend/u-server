import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Category } from './category.schema';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryLoader {
  constructor(private readonly categoryService: CategoryService) {}

  public createLoader() {
    return new DataLoader<string, Category>(async (categoryIds: string[]) => {
      const categories = await this.categoryService.findByIds(categoryIds);

      const categoryMap = new Map(
        categories.map((category) => [category.id, category]),
      );

      return categoryIds.map((categoryId) => categoryMap.get(categoryId));
    });
  }
}
