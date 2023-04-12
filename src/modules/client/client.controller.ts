import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateClientDto } from './dtos/client.create.dto';
import { UpdateClientDto } from './dtos/client.update.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Post()
  async create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
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
