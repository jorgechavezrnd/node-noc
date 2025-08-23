import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      // console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }

  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
      <h3> Logs del sistema - NOC</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae dolor accumsan, condimentum nisl ac, scelerisque ex. Aenean fermentum purus est, ut iaculis lorem sagittis porttitor. Vestibulum facilisis augue eu quam fringilla accumsan. Aliquam condimentum eu risus id porta. Vivamus bibendum justo lacinia rhoncus suscipit. Aenean dignissim nibh sit amet consectetur aliquet. Curabitur sed efficitur dolor, tristique sodales leo.</p>
      <p>Ver logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }

}
