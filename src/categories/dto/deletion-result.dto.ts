import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletionResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  confirmationRequired?: boolean;
}
