import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RiskFilterArgs {
  @Field(() => Boolean, { nullable: true })
  resolved?: boolean;
}
