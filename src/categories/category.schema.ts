import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Category extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  description: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  color: string;

  @Field()
  @Prop({ type: String })
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
