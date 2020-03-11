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
    this.winstonLogger.error(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
  }

  public warn(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.warn(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
  }

  public info(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.info(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
  }

  public debug(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.debug(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
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

  private static getFormatMessage(message: any): string {
    let result: string;
    try {
      result = JSON.stringify(message);
    } catch (error) {
      result = `JSON.stringify() error: ${error}`;
    }
    return result;
  }

  private getFormatMetadata(metadata: LoggerMetadata = {}): object {
    return {
      ...metadata,
      loggingFilePath: this.fileRelativePath,
    };
  }
}
