import { ArgsType, IntersectionType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/pagination/pagination.dto';
import { RiskFilterArgs } from './risk-filter.args';

@ArgsType()
export class RiskPaginationFilterArgs extends IntersectionType(
  PaginationArgs,
  RiskFilterArgs,
) {}
