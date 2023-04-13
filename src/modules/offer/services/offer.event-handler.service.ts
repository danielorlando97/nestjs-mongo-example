import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from '../offer.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RestaurantEventHandlerService {
  private logger = new Logger('RestaurantEventHandlerService');

  constructor(@InjectModel(Offer.name) private model: Model<OfferDocument>) {}

  @OnEvent('client.deleted', { async: true })
  async handleClientDeletedEvent(clientId: string) {
    this.logger.verbose(`Handling the event client.deleted by ${clientId} id`);

    await this.model.deleteMany({ Client: clientId });
  }

  @OnEvent('restaurant.deleted', { async: true })
  async handleRestaurantDeletedEvent(resId: string) {
    this.logger.verbose(`Handling the event restaurant.deleted by ${resId} id`);

    await this.model.deleteMany({ Restaurant: resId });
  }
}
