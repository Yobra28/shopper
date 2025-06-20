/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsNumber, IsUrl, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;
}