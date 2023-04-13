import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOfferDto } from './dtos/offer.create.dto';
import { UpdateOfferDto } from './dtos/offer.update.dto';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './offer.entity';
import { ClientService } from '../client/client.service';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private model: Model<OfferDocument>,
    private clientService: ClientService,
    private resService: RestaurantService,
  ) {}

  async checkRelationsOrFail(
    clientId: string | undefined,
    resId: string | undefined,
  ): Promise<any> {
    if (clientId) await this.clientService.getOne(clientId);
    if (resId) await this.resService.getOne(resId);
  }

  async create(dto: CreateOfferDto): Promise<Offer> {
    await this.checkRelationsOrFail(dto.clientId, dto.resId);

    const newEntity = await new this.model(dto);
    return newEntity.save();
  }

  async update(id: string, dto: UpdateOfferDto): Promise<Offer> {
    await this.checkRelationsOrFail(dto.clientId, dto.resId);

    const existingEntity = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!existingEntity) {
      throw new NotFoundException(`Offer #${id} not found`);
    }
    return existingEntity;
  }

  async getAll(): Promise<Offer[]> {
    const entity = await this.model.find();
    if (!entity || entity.length == 0) {
      throw new NotFoundException('Offers data not found!');
    }
    return entity;
  }

  async getOne(id: string): Promise<Offer> {
    const existingEntity = await this.model.findById(id).exec();
    if (!existingEntity) {
      throw new NotFoundException(`Offer #${id} not found`);
    }
    return existingEntity;
  }

  async delete(id: string): Promise<Offer> {
    const deletedEntity = await this.model.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new NotFoundException(`Offer #${id} not found`);
    }
    return deletedEntity;
  }
}
