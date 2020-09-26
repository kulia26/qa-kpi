import CRITICAL_STATUSES from './criticals';

class ExceptionManager {
  constructor() {
    this.commonCount = 0;
    this.criticalCount = 0;
  }

  static isCritical(error) {
    return CRITICAL_STATUSES.includes(error.message);
  }

  catch(error) {
    if (ExceptionManager.isCritical(error)) {
      this.criticalCount += 1;
    } else {
      this.commonCount += 1;
    }
  }
}

export default ExceptionManager;
