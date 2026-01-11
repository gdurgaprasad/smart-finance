import chalk from 'chalk';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

/**
 * Custom log levels
 * Lower number = higher priority
 */
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 3
  }
};

// unified color formatter (used for BOTH console and file)
const colorizedFormat = printf(({ level, message, timestamp }) => {
  switch (level) {
    case 'info':
      return chalk.blue(`${timestamp} [INFO] ${message}`);
    case 'warn':
      return chalk.yellow(`${timestamp} [WARN] ${message}`);
    case 'success':
    case 'error':
      return chalk.red(`${timestamp} [ERROR] ${message}`);
    default:
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
  }
});

const fileFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});
// daily rotating file transport (WITH COLORS)
const dailyRotateTransport = new DailyRotateFile({
  dirname: 'logs',
  filename: 'smart-finance-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '1d',
  level: 'info',
  format: combine(timestamp(), fileFormat)
});

export interface AppLogger extends winston.Logger {
  success(message: string): void;
}

export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'info',
  transports: [
    dailyRotateTransport,
    new winston.transports.Console({
      format: combine(timestamp(), colorizedFormat)
    })
  ]
}) as AppLogger;
