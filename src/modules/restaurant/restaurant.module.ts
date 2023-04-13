import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantSchema } from './restaurant.entity';
import { ClientModule } from '../client/client.module';

@Module({
  providers: [RestaurantService],
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
