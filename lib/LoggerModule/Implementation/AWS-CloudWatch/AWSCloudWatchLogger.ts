import path from "path";
import { Logger as WinstonLogger } from "winston";
import { Logger, LoggerMessage, LoggerMetadata } from "../../Logger";

export class AWSCloudWatchLogger implements Logger {
  error(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.error(this.formatMessage(message), this.formatMetadata(metadata));
  }

  warn(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.warn(this.formatMessage(message), this.formatMetadata(metadata));
  }

  info(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.info(this.formatMessage(message), this.formatMetadata(metadata));
  }

  debug(message: LoggerMessage, metadata?: LoggerMetadata): void {
    this.winstonLogger.debug(this.formatMessage(message), this.formatMetadata(metadata));
  }

  constructor(options: { filePath: string; rootPath: string; winstonLogger: WinstonLogger }) {
    this.rootPath = options.rootPath;
    this.filePath = options.filePath;
    this.fileRelativePath = path.relative(this.rootPath, this.filePath).replace(/\\/g, "/");
    this.winstonLogger = options.winstonLogger;
  }

  private readonly rootPath: string;
  private readonly filePath: string;
  private readonly fileRelativePath: string;
  private readonly winstonLogger: WinstonLogger;

  private formatMessage(message: LoggerMessage): LoggerMessage {
    return message;
  }

  private formatMetadata(metadata: LoggerMetadata = {}): object {
    return {
      ...metadata,
      loggingFilePath: this.fileRelativePath,
    };
  }
}
