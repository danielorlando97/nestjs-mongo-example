import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantEventHandlerService } from './services/restaurant.event-handler.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantSchema } from './restaurant.entity';
import { ClientModule } from '../client/client.module';

@Module({
  providers: [RestaurantService, RestaurantEventHandlerService],
  exports: [RestaurantService],
  controllers: [RestaurantController],
  imports: [
    ClientModule,
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
})
export class RestaurantModule {}
