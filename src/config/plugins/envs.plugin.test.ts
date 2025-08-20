import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {

  test('should return env options', () => {

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'jorge.chavez.r@ucb.edu.bo',
      MAILER_SECRET_KEY: 'jtmyovockkxtqabz',
      PROD: false,
      MONGO_URL: 'mongodb://jorge:123456789@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'jorge',
      MONGO_PASS: '123456789'
    });

  });

  test('should return error if not found env', async () => {

    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }

  });

});
