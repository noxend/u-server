import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateRiskInput } from './create-risk.input';

@InputType()
export class UpdateRiskInput extends PartialType(CreateRiskInput) {
  @Field(() => ID)
  id: string;
}
