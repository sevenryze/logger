import path from "path";
import { createLogger, format, Logger as WinstonLogger, transports } from "winston";
import { Logger, LoggerLevel, LoggerMessage, LoggerMetadata } from "../../Logger";

export interface DebugLoggerOptions {
  filePath: string;
  rootPath: string;
  level: LoggerLevel;
}

export class DebugLogger implements Logger {
  public error(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.error(this.getFormatMessage(message), metadata);
  }

  public warn(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.warn(this.getFormatMessage(message), metadata);
  }

  public info(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.info(this.getFormatMessage(message), metadata);
  }

  public debug(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.debug(this.getFormatMessage(message), metadata);
  }

  constructor(options: DebugLoggerOptions) {
    this.rootPath = options.rootPath;
    this.filePath = options.filePath;
    this.fileRelativePath = path.relative(this.rootPath, this.filePath).replace(/\\/g, "/");

    this.winstonLogger = createLogger({
      format: format.combine(format.colorize(), format.timestamp(), format.ms(), format.simple()),
      level: options.level,
      transports: [new transports.Console()],
    });
  }

  private readonly rootPath: string;
  private readonly filePath: string;
  private readonly fileRelativePath: string;

  private winstonLogger: WinstonLogger;

  private getFormatMessage(message: string): string {
    return `[${this.fileRelativePath}][${message}]`;
  }
}
