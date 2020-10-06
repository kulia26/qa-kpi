import ExceptionManager from './ExceptionManager';
import Logger from './Logger';

jest.mock('./Logger');

Logger.sendError.mockImplementation(() => Promise.reject());

const exceptionManager = new ExceptionManager();

const exceptionCases = [
  {
    error: new Error('unknown error'),
    isCritical: true,
  },
  {
    error: new Error('node error'),
    isCritical: true,
  },
  {
    error: new Error('some bug was happened'),
    isCritical: false,
  },
  {
    error: new Error(),
    isCritical: false,
  },
];

jest.spyOn(ExceptionManager, 'isCritical');
jest.spyOn(exceptionManager, 'catch');

describe('ExceptionManager', () => {
  describe.each(exceptionCases)(
    'isCritical method', ({ error, isCritical }) => {
      test(`on ${error.message} returns ${isCritical}`, () => {
        const result = ExceptionManager.isCritical(error);

        expect(result).toBe(isCritical);
      });
    },
  );

  describe.each(exceptionCases)(
    'catch method', ({ error, isCritical }) => {
      const counterName = isCritical ? 'criticalCount' : 'commonCount';

      let newFailedRequestsCount;
      let newCriticalCountValue;
      let newCommonCountValue;

      beforeAll(async () => {
        const { criticalCount, commonCount, failedRequestsCount } = exceptionManager;
        newFailedRequestsCount = isCritical ? failedRequestsCount + 1 : failedRequestsCount;
        newCriticalCountValue = isCritical ? criticalCount + 1 : criticalCount;
        newCommonCountValue = isCritical ? commonCount : commonCount + 1;

        await exceptionManager.catch(error);
      });

      test(`on ${error.message} increase ${counterName}`, () => {
        expect(exceptionManager.criticalCount).toBe(newCriticalCountValue);
        expect(exceptionManager.commonCount).toBe(newCommonCountValue);
      });

      if (isCritical) {
        test(`on critical error "${error.message}" sent to logger`, () => {
          expect(Logger.sendError).toHaveBeenLastCalledWith(error);
        });

        test(`on critical error "${error.message}" and doesn't sent to logger increase failedRequestsCount`, () => {
          expect(exceptionManager.failedRequestsCount).toBe(newFailedRequestsCount);
        });
      } else {
        test(`on common error "${error.message}" doesn't sent to logger`, () => {
          expect(Logger.sendError).not.toHaveBeenLastCalledWith(error);
        });
      }
    },
  );
});
