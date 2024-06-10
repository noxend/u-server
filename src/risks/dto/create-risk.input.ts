import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRiskInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => ID)
  categoryId: string;

  @Field()
  resolved: boolean;

  @Field()
  createdBy: string;
}
