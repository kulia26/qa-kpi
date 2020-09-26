import ExceptionManager from './ExceptionManager';

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
      test(`on ${error.message} increase ${counterName}`, () => {
        const { criticalCount, commonCount } = exceptionManager;
        const newCriticalCountValue = isCritical ? criticalCount + 1 : criticalCount;
        const newCommonCountValue = isCritical ? commonCount : commonCount + 1;

        exceptionManager.catch(error);

        expect(exceptionManager.criticalCount).toBe(newCriticalCountValue);
        expect(exceptionManager.commonCount).toBe(newCommonCountValue);
      });
    },
  );
});
