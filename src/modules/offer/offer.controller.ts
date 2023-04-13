import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOfferDto } from './dtos/offer.create.dto';
import { UpdateOfferDto } from './dtos/offer.update.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly service: OfferService) {}

  @Post()
  async create(@Body() dto: CreateOfferDto) {
    return this.service.create(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
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
