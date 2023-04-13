import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/order.create.dto';
import { UpdateOrderDto } from './dtos/order.update.dto';
import { OrderService } from './services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
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
}
