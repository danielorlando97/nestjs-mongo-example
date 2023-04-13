import { IsString, IsEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsString()
  clientId: string;

  @IsString()
  resId: string;

  @IsEmpty()
  status: any;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
