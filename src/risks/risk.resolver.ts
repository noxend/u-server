import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Category } from 'src/categories/category.schema';
import { createPaginatedResults } from 'src/pagination/pagination.dto';
import { CreateRiskInput } from './dto/create-risk.input';
import { RiskPaginationFilterArgs } from './dto/risk-pagination-filter.args';
import { UpdateRiskInput } from './dto/update-risk.input';
import { Risk } from './risk.schema';
import { RiskService } from './risk.service';

const RiskPaginatedResults = createPaginatedResults(Risk);

@Resolver(() => Risk)
export class RiskResolver {
  constructor(private readonly riskService: RiskService) {}

  @Query(() => RiskPaginatedResults)
  async risks(@Args() { limit, page, ...filters }: RiskPaginationFilterArgs) {
    const results = await this.riskService.findAll({ limit, page }, filters);
    return results;
  }

  @Mutation(() => Risk)
  createRisk(@Args('input') input: CreateRiskInput) {
    return this.riskService.create(input);
  }

  @Mutation(() => Risk)
  updateRisk(@Args('input') input: UpdateRiskInput) {
    return this.riskService.update(input);
  }

  @Mutation(() => Risk)
  deleteRisk(@Args('id', { type: () => ID }) id: string) {
    return this.riskService.delete(id);
  }

  @ResolveField(() => Category, { nullable: true })
  category(
    @Parent() risk: Risk,
    @Context('categoryLoader') categoryLoader: DataLoader<string, Category>,
  ) {
    if (!risk.categoryId) {
      return null;
    }

    return categoryLoader.load(risk.categoryId);
  }
}
