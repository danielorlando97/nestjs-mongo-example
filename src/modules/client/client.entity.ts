import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  age: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  @Exclude()
  deletedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
