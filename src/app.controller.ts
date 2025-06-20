import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-email')
  async sendTestEmail(): Promise<string> {
    const testEmail = 'test@example.com';
    const testFirstName = 'Test';
    await this.emailService.sendWelcomeEmail(testEmail, testFirstName);
    return `Test email sent to ${testEmail}. Check maildev at http://localhost:1080`;
  }
}
