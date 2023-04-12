import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dtos/restaurant.create.dto';
import { UpdateRestaurantDto } from './dtos/restaurant.update.dto';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurant.entity';
import { ClientService } from '../client/client.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private model: Model<RestaurantDocument>,
    private clientService: ClientService,
  ) {}

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    const newEntity = await new this.model(dto);
    return newEntity.save();
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<Restaurant> {
    const existingEntity = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!existingEntity) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return existingEntity;
  }

  async getAll(): Promise<Restaurant[]> {
    const entity = await this.model.find();
    if (!entity || entity.length == 0) {
      throw new NotFoundException('Restaurants data not found!');
    }
    return entity;
  }

  async getOne(id: string): Promise<Restaurant> {
    const existingEntity = await this.model
      .findById(id)
      .populate('Clients')
      .exec();

    if (!existingEntity) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return existingEntity;
  }

  async delete(id: string): Promise<Restaurant> {
    const deletedEntity = await this.model.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return deletedEntity;
  }

  async addClient(resId: string, clientId: string) {
    // Check the client or throw exception
    await this.clientService.getOne(clientId);
    const existingRest = await this.getOne(resId);

    if (existingRest.capacity <= existingRest.Clients.length)
      throw new BadRequestException('The restaurant is fully');

    return this.model.findByIdAndUpdate(
      resId,
      { $addToSet: { Clients: clientId } },
      { new: true },
    );
  }

  async removeClient(resId: string, clientId: string) {
    return this.model.findByIdAndUpdate(
      resId,
      { $pull: { Clients: clientId } },
      { new: true },
    );
  }
}
