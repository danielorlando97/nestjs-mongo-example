import { IsString, IsEmpty } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  description: string;

  @IsString()
  clientId: string;

  @IsString()
  resId: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
