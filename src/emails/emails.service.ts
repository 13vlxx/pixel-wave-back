import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/_utils/config/config';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  sendEmailLostPassword = (
    email: string,
    passwordResetCode: string,
    passwordResetCodeDate: number,
  ) =>
    this.mailerService.sendMail({
      to: email,
      subject: 'Pixel Wave - Mot de passe oublié',
      template: 'lost-password.template.ejs',
      context: {
        resetPasswordUrl: `${this.configService.get(
          'FRONT_URL',
        )}reset-password?token=${passwordResetCode}&expire=${passwordResetCodeDate}`,
      },
    });
}
