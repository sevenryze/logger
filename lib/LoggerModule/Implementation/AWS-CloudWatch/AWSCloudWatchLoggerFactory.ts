import { AWSCloudWatchLogger } from "./AWSCloudWatchLogger";
import { Logger, LoggerLevel } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { LoggerModuleOptionsIoCAnchor } from "../../LoggerModuleOptions";
import { createLogger, format, Logger as WinstonLogger, transports } from "winston";
import fsExtra from "fs-extra";
import DailyRotateFileTransport from "winston-daily-rotate-file";
import WinstonCloudWatch from "winston-cloudwatch";

export interface AWSCloudWatchLoggerFactoryOptions {
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

@Injectable()
export class AWSCloudWatchLoggerFactory implements LoggerFactory, OnModuleDestroy {
  generate(options: LoggerFactoryGenerateOptions): Logger {
    return new AWSCloudWatchLogger({
      filePath: options.issuerFilename,
      rootPath: this.rootPath,
      winstonLogger: this.winstonLogger,
    });
  }

  onModuleDestroy(): Promise<void> {
    return this.flushAndExit();
  }

  constructor(@Inject(LoggerModuleOptionsIoCAnchor) private options: AWSCloudWatchLoggerFactoryOptions) {
    this.rootPath = options.rootPath;

    this.winstonLogger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      level: options.level,
    });

    if (options.localBackup?.isActive && options.localBackup?.dir) {
      console.log(`Ensure the local backup log directory exists: ${options.localBackup?.dir}`);
      fsExtra.ensureDirSync(options.localBackup?.dir, {
        mode: 0o2777,
      });

      this.winstonLogger.add(
        new DailyRotateFileTransport({
          datePattern: "YYYY-MM-DD",
          filename: `${options.localBackup?.dir}/error-%DATE%.log`,
          level: "error",
          maxFiles: `${options.localBackup.retentionDays}d`,
          zippedArchive: true,
        })
      );

      this.winstonLogger.add(
        new DailyRotateFileTransport({
          datePattern: "YYYY-MM-DD",
          filename: `${options.localBackup?.dir}/combined-%DATE%.log`,
          maxFiles: `${options.localBackup.retentionDays}d`,
          zippedArchive: true,
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
  private readonly winstonLogger: WinstonLogger;

  private flushAndExit(): Promise<void> {
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
}
