import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dtos/client.create.dto';
import { UpdateClientDto } from './dtos/client.update.dto';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private model: Model<ClientDocument>) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const newEntity = await new this.model(dto);
    return newEntity.save();
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const existingEntity = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!existingEntity) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return existingEntity;
  }

  async getAll(): Promise<Client[]> {
    const entity = await this.model.find();
    if (!entity || entity.length == 0) {
      throw new NotFoundException('Clients data not found!');
    }
    return entity;
  }

  async getOne(id: string): Promise<Client> {
    const existingEntity = await this.model.findById(id).exec();
    if (!existingEntity) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return existingEntity;
  }

  async delete(id: string): Promise<Client> {
    const deletedEntity = await this.model.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return deletedEntity;
  }
}
