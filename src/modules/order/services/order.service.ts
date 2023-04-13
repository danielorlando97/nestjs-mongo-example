import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from '../dtos/order.create.dto';
import { UpdateOrderDto } from '../dtos/order.update.dto';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.entity';
import { ClientService } from '../../client/client.service';
import { RestaurantService } from '../../restaurant/services/restaurant.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { randomInt } from 'lodash';

@Injectable()
export class OrderService {
  private logger = new Logger('OrderService');

  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>,
    private clientService: ClientService,
    private resService: RestaurantService,
    @InjectQueue('kitchen') private kitchenQueue: Queue,
  ) {}

  async checkRelationsOrFail(
    clientId: string | undefined,
    resId: string | undefined,
  ): Promise<any> {
    if (clientId) await this.clientService.getOne(clientId);
    if (resId) await this.resService.getOne(resId);

    return [clientId, resId];
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const [Client, Restaurant] = await this.checkRelationsOrFail(
      dto.clientId,
      dto.resId,
    );

    const newEntity = await new this.model({
      Client: Client,
      Restaurant: Restaurant,
      ...dto,
    });

    const order = await newEntity.save();

    const [a, b] = [3000, 10000];
    const delay = Math.floor((b - a) * Math.random() + a);
    await this.kitchenQueue.add(order._id, { delay: delay });

    this.logger.verbose(
      `Send order to the kitchen, the plate will be ready in ${delay / 1000}s`,
    );

    return order;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    const [Client, Restaurant] = await this.checkRelationsOrFail(
      dto.clientId,
      dto.resId,
    );

    const existingEntity = await this.model.findByIdAndUpdate(
      id,
      {
        Client: Client,
        Restaurant: Restaurant,
        ...dto,
      },
      {
        new: true,
      },
    );

    if (!existingEntity) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return existingEntity;
  }

  async getAll(): Promise<Order[]> {
    const entity = await this.model.find();
    if (!entity || entity.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return entity;
  }

  async getOne(id: string): Promise<Order> {
    const existingEntity = await this.model
      .findById(id)
      .populate('Client')
      .populate('Restaurant')
      .exec();

    if (!existingEntity) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return existingEntity;
  }

  async delete(id: string): Promise<Order> {
    const deletedEntity = await this.model.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return deletedEntity;
  }
}
