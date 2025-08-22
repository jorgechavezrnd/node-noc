import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('CheckServiceMultiple UseCase', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepositories = [mockRepository, mockRepository2, mockRepository3];
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {

    const wasOk = await checkServiceMultiple.execute('https://google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    for(const mockRepo of mockRepositories) {
      expect(mockRepo.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity),
      );
    }

  });

  test('should call errorCallback when fetch returns false', async () => {
    const wasOk = await checkServiceMultiple.execute('https://googleasdasd.com');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    for(const mockRepo of mockRepositories) {
      expect(mockRepo.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity),
      );
    }

  });

});
