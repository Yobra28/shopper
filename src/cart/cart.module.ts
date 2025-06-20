/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from '../products/products.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [ProductsModule],
  controllers: [CartController],
  providers: [CartService, EmailService],
})
export class CartModule {}