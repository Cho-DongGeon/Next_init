import 'server-only';

let logger;

async function getLogger() {
  if (logger) return logger;

  const { Logger } = await import('seq-logging');

  //사용중인 SEQ: 1
  logger = new Logger({
    serverUrl: process.env.SEQ_LOGGER_URL_1,
    apiKey: process.env.SEQ_LOGGER_API_KEY_1,
  });

  return logger;
}

async function emit(level, message = 'no message', properties = {}) {
  const logger = await getLogger();

  logger.emit({
    timestamp: new Date(),
    level,
    messageTemplate: message,
    properties: {
      ApplicationName: 'init-test',//이부분 프로젝트명으로 변경하기, apikey도 같은 이름으로 만들기
      ...properties,
    },
  });
}

if (!globalThis.seqlog) {
  globalThis.seqlog = {
    log(message, properties) {
      return emit('Information', message, properties);
    },
    warn(message, properties) {
      return emit('Warning', message, properties);
    },
    error(message, properties) {
      return emit('Error', message, properties);
    },
  };
}

export {};
