import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Risk extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field()
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: string;

  @Field()
  @Prop({ type: Boolean, default: false })
  resolved: boolean;

  @Field()
  @Prop({ type: String })
  createdBy: string;
}

export const RiskSchema = SchemaFactory.createForClass(Risk);
