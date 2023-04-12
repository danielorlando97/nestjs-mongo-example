import {
  IsString,
  IsOptional,
  IsEmpty,
  IsInt,
  IsPositive,
} from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsInt()
  @IsPositive()
  capacity: number;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
