import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class Server {

  public static start() {

    console.log('Server started...');

    // Mandar email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'jorgechavezrnd@gmail.com',
      subject: 'Logs del sistema',
      htmlBody: `
        <h3> Logs del sistema - NOC</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae dolor accumsan, condimentum nisl ac, scelerisque ex. Aenean fermentum purus est, ut iaculis lorem sagittis porttitor. Vestibulum facilisis augue eu quam fringilla accumsan. Aliquam condimentum eu risus id porta. Vivamus bibendum justo lacinia rhoncus suscipit. Aenean dignissim nibh sit amet consectetur aliquet. Curabitur sed efficitur dolor, tristique sodales leo.</p>
        <p>Ver logs adjuntos</p>
      `
    });

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${ url } is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //     // new CheckService().execute('http://localhost:3000');

    //   }
    // );

  }

}
