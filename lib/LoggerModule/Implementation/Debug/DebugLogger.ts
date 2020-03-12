import path from "path";
import { Logger as WinstonLogger } from "winston";
import { Logger, LoggerMessage, LoggerMetadata } from "../../Logger";

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
