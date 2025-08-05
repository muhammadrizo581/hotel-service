import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService
  ) {}

  async sendActivationLink(
    name: string,
    surname: string,
    email: string,
    activationLink: string
  ) {
    const url = `${process.env.API_URL || process.env.api_url}/api/auth/activate/${activationLink}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "HIsobingizni faollashtiring",
        template: "cnfrm",
        context: {
          name: `${name} ${surname}`,
          url,
        },
      });
    } catch (err) {
      this.logger.error(
        `Failed to send activation link to email ${email}`,
        err as any
      );
      throw err;
    }
  }
}
