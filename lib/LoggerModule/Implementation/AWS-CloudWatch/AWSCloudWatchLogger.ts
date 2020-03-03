import fsExtra from "fs-extra";
import path from "path";
import { createLogger, format, Logger as WinstonLogger, transports } from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import DailyRotateFileTransport from "winston-daily-rotate-file";
import { Logger, LoggerLevel, LoggerMessage, LoggerMetadata } from "../../Logger";

export interface AWSCloudWatchLoggerOptions {
  filePath: string;
  rootPath: string;
  level: LoggerLevel;
  groupName: string;
  streamName: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  localBackup?: {
    isActive: boolean;
    dir: string;
    retentionDays: number;
  };
  printToConsole?: boolean;
}

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

  flushAndExit(): Promise<void> {
    return new Promise(resolve => {
      const transport: any = this.winstonLogger.transports.find((t: any) => t.name === "CloudWatch");

      if (transport) {
        transport.kthxbye(() => {
          console.info("Logs were successfully flushed to CloudWatch.");
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  constructor(options: AWSCloudWatchLoggerOptions) {
    this.rootPath = options.rootPath;
    this.filePath = options.filePath;
    this.fileRelativePath = path.relative(this.rootPath, this.filePath).replace(/\\/g, "/");

    this.localBackupDir = options.localBackup?.dir;

    this.winstonLogger = createLogger({
      format: format.combine(format.timestamp(), format.ms(), format.json()),
      level: options.level,
    });

    if (options.localBackup?.isActive && this.localBackupDir) {
      console.log(`Ensure the local backup log directory exists: ${this.localBackupDir}`);
      fsExtra.ensureDirSync(this.localBackupDir, {
        mode: 0o2777,
      });

      this.winstonLogger.add(
        new DailyRotateFileTransport({
          datePattern: "YYYY-MM-DD",
          filename: `${this.localBackupDir}/error-%DATE%.log`,
          level: "error",
          maxFiles: `${options.localBackup.retentionDays}d`,
        })
      );

      this.winstonLogger.add(
        new DailyRotateFileTransport({
          datePattern: "YYYY-MM-DD",
          filename: `${this.localBackupDir}/combined-%DATE%.log`,
          maxFiles: `${options.localBackup.retentionDays}d`,
        })
      );
    }

    if (options.printToConsole) {
      console.log(`Print to console.`);
      this.winstonLogger.add(new transports.Console());
    }

    console.log(`Add AWS CloudWatch logger.`);
    this.winstonLogger.add(
      new WinstonCloudWatch({
        level: options.level,
        logGroupName: options.groupName,
        logStreamName: options.streamName,
        awsAccessKeyId: options.accessKeyId,
        awsSecretKey: options.secretAccessKey,
        awsRegion: options.region,
        jsonMessage: true,
      })
    );
  }

  private readonly rootPath: string;
  private readonly filePath: string;
  private readonly fileRelativePath: string;
  private readonly localBackupDir?: string;

  private winstonLogger: WinstonLogger;

  private formatMessage(message: LoggerMessage): LoggerMessage {
    return typeof message === "string" ? `[${this.fileRelativePath}][${message}]` : message;
  }

  private formatMetadata(metadata?: LoggerMetadata): string {
    return "metadata";
  }
}
