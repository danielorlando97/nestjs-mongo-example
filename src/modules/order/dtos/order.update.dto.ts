import { IsString, IsOptional, IsEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
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
