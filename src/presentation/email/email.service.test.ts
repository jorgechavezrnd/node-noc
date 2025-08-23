import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe('EmailService', () => {

  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test('should send email', async () => {

    const options: SendMailOptions = {
      to: 'jorge@google.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    };

    const emailSent = await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "jorge@google.com",
    });

  });

  test('should send email with attachments', async () => {

    const email = 'jorge@google.com';
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]),
    });

  });

});
