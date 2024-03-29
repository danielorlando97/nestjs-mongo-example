import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule],
})
export class ModulesModule {}
