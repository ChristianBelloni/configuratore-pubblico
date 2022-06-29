const GetLogger = () => {
  const logger = new Logger();
  return logger;
};

class Logger {
  info(msg: any) {
    console.log(msg);
  }
  error(msg: any) {
    console.error(msg);
  }
}

const logger = GetLogger();

export { logger };
