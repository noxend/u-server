import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Int, { defaultValue: 20, nullable: true })
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

export interface IPaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  page: number;
}

export const createPaginatedResults = <T>(classRef: Type<T>) => {
  @ObjectType(`${classRef.name}PaginatedResults`, { isAbstract: true })
  abstract class PaginatedResultHost implements IPaginatedResult<T> {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    page: number;
  }

  return PaginatedResultHost;
};
