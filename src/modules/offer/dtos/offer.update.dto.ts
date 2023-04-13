import { IsString, IsOptional, IsEmpty } from 'class-validator';

export class UpdateOfferDto {
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
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
