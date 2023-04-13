import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderEventHandlerService {
  private logger = new Logger('OrderEventHandlerService');

  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  @OnEvent('client.deleted', { async: true })
  async handleClientDeletedEvent(clientId: string) {
    this.logger.verbose(`Handling the event client.deleted by ${clientId} id`);

    await this.model.deleteMany({ Client: clientId });
  }

  @OnEvent('restaurant.deleted', { async: true })
  async handleOrderDeletedEvent(resId: string) {
    this.logger.verbose(`Handling the event restaurant.deleted by ${resId} id`);

    await this.model.deleteMany({ Restaurant: resId });
  }
}
