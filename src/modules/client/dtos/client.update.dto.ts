import {
  IsString,
  IsEmail,
  IsOptional,
  IsEmpty,
  IsInt,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  age: number;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
