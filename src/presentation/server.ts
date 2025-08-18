import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource(),
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);

const emailService = new EmailService();

export class Server {

  public static async start() {

    console.log('Server started...');

    // TODO: Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute(
    //   ['jorgechavezrnd@gmail.com', 'jorge.chavez.r@ucb.edu.bo']
    // );
    // emailService.sendEmailWithFileSystemLogs(
    //   ['jorgechavezrnd@gmail.com', 'jorge.chavez.r@ucb.edu.bo']
    // );

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com';

    //     new CheckServiceMultiple(
    //       [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //       () => console.log(`${ url } is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //   }
    // );

  }

}
