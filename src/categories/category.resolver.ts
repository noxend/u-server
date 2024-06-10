import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  createPaginatedResults,
} from 'src/pagination/pagination.dto';
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { DeletionResult } from './dto/deletion-result.dto';
import { UpdateCategoryInput } from './dto/update-category.input';

const CategoryPaginatedResults = createPaginatedResults(Category);

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Query(() => CategoryPaginatedResults)
  categories(
    @Args() paginationArgs: PaginationArgs,
    @Args('name', { nullable: true }) name?: string,
  ) {
    return this.categoryService.findAll(paginationArgs, name);
  }

  @Mutation(() => Category)
  updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input);
  }

  @Mutation(() => DeletionResult)
  deleteCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('confirm', { type: () => Boolean, nullable: true }) confirm: boolean,
  ) {
    return this.categoryService.delete(id, confirm);
  }
}
