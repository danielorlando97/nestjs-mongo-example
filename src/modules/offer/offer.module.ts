import { Module, Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferService } from './services/offer.service';
import { OfferController } from './offer.controller';
import { Offer, OfferSchema } from './offer.entity';
import { ClientModule } from '../client/client.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  providers: [OfferService],
  exports: [OfferService],
  controllers: [OfferController],
  imports: [
    ClientModule,
    RestaurantModule,
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
  ],
})
export class OfferModule {}
