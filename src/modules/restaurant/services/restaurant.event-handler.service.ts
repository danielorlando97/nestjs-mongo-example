import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from '../restaurant.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RestaurantEventHandlerService {
  private logger = new Logger('RestaurantEventHandlerService');

  constructor(
    @InjectModel(Restaurant.name) private model: Model<RestaurantDocument>,
  ) {}

  @OnEvent('client.deleted', { async: true })
  async handleClientDeletedEvent(clientId: string) {
    this.logger.verbose(`Handling the event client.deleted by ${clientId} id`);

    await this.model.updateMany(
      { Clients: { $elemMatch: { $eq: clientId } } },
      { $pull: { Clients: clientId } },
    );
  }
}
