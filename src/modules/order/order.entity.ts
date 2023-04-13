import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { Client } from '../client/client.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  READY = 'ready',
}

@Schema()
export class Order {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Client.name })
  Client: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurant.name })
  Restaurant: Restaurant;

  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  @Exclude()
  deletedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
