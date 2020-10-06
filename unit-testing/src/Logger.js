class Logger {
  static sendError(error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(error);
        reject();
      }, 8000);
    });
  }
}

export default Logger;
