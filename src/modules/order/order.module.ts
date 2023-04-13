import { Module, Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order.service';
import { OrderEventHandlerService } from './services/order.event-handler.service';
import { KitchenConsumer } from './services/kitchen.quee-handler.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.entity';
import { ClientModule } from '../client/client.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [OrderService, OrderEventHandlerService, KitchenConsumer],
  exports: [OrderService],
  controllers: [OrderController],
  imports: [
    ClientModule,
    RestaurantModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    BullModule.registerQueue({
      name: 'kitchen',
    }),
  ],
})
export class OrderModule {}
