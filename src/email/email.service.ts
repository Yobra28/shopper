/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EmailOptions } from './interfaces/email.interface';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(options: EmailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail(options);
      this.logger.log(`Email sent successfully to ${options.to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${options.to}:`,
        error.stack,
      );
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    return this.sendMail({
      to: email,
      subject: 'Welcome to Shopie!',
      template: 'welcome',
      context: {
        firstName,
        frontendUrl,
      },
    });
  }

  async sendPasswordResetEmail(
    email: string,
    firstName: string,
    token: string,
  ) {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
    return this.sendMail({
      to: email,
      subject: 'Password Reset Request - Shopie',
      template: 'password-reset',
      context: {
        firstName,
        resetUrl,
      },
    });
  }

  async sendOrderConfirmationEmail(
    email: string,
    firstName: string,
    orderId: number,
    orderItems: any[],
    total: number,
  ) {
    const formattedItems = orderItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price.toFixed(2),
      total: (item.product.price * item.quantity).toFixed(2),
    }));

    return this.sendMail({
      to: email,
      subject: `Order Confirmation #${orderId} - Shopie`,
      template: 'order-confirmation',
      context: {
        firstName,
        orderId,
        orderDate: new Date().toLocaleDateString(),
        items: formattedItems,
        grandTotal: total.toFixed(2),
      },
    });
  }
} 