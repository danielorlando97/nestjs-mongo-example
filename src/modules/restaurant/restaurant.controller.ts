import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/restaurant.create.dto';
import { UpdateRestaurantDto } from './dtos/restaurant.update.dto';
import { RestaurantService } from './services/restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @Post()
  async create(@Body() dto: CreateRestaurantDto) {
    return this.service.create(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateRestaurantDto) {
    return this.service.update(id, dto);
  }

  @Get()
  async getAll() {
    return this.service.getAll() as any;
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Patch('/:id/add-client/:clientId')
  addOwner(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.service.addClient(id, clientId);
  }

  @Patch('/:id/remove-owner/:clientId')
  removeOwner(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.service.removeClient(id, clientId);
  }
}
