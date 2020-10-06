import CRITICAL_STATUSES from './criticals';
import Logger from './Logger';

class ExceptionManager {
  constructor() {
    this.commonCount = 0;
    this.criticalCount = 0;
    this.failedRequestsCount = 0;
  }

  static isCritical(error) {
    return CRITICAL_STATUSES.includes(error.message);
  }

  catch(error) {
    let result = Promise.resolve();
    if (ExceptionManager.isCritical(error)) {
      this.criticalCount += 1;
      result = Logger
        .sendError(error)
        .catch(() => {
          this.failedRequestsCount += 1;
        });
    } else {
      this.commonCount += 1;
    }
    return result;
  }
}

export default ExceptionManager;
