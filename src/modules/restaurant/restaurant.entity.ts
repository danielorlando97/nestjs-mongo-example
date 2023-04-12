import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import mongoose from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Client } from '../client/client.entity';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  capacity: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Client.name }])
  Clients: [Client];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  @Exclude()
  deletedAt?: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
