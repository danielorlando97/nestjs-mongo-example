import {
  IsString,
  IsEmail,
  IsOptional,
  IsEmpty,
  IsPhoneNumber,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt?: Date;
}
