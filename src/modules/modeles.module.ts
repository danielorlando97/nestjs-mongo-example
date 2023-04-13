import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [OfferModule],
})
export class ModulesModule {}
