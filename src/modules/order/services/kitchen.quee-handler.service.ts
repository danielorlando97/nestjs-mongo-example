import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from '../order.entity';

@Processor('kitchen')
export class KitchenConsumer {
  private logger = new Logger('KitchenEventHandlerService');

  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  @Process()
  async finishOrder(job: Job<string>) {
    //The time in the queue is interpreted as cooking :)
    const orderId = job.data;
    this.logger.verbose(`Handling the event kitchen.finish by ${orderId} id`);
    await this.model.findByIdAndUpdate(
      orderId,
      {
        status: OrderStatus.READY,
      },
      {
        new: true,
      },
    );

    return {};
  }
}
