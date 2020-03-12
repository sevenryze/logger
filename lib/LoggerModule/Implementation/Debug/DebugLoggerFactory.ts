import { DebugLogger } from "./DebugLogger";
import { Logger, LoggerLevel } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { Inject, Injectable } from "@nestjs/common";
import { LoggerModuleOptionsIoCAnchor } from "../../LoggerModuleOptions";
import { createLogger, format, Logger as WinstonLogger, transports } from "winston";

export interface DebugLoggerFactoryOptions {
  rootPath: string;
  level: LoggerLevel;
}

@Injectable()
export class DebugLoggerFactory implements LoggerFactory {
  generate(options: LoggerFactoryGenerateOptions): Logger {
    return new DebugLogger({
      filePath: options.issuerFilename,
      rootPath: this.rootPath,
      winstonLogger: this.winstonLogger,
    });
  }

  async cleanup(): Promise<void> {}

  constructor(@Inject(LoggerModuleOptionsIoCAnchor) private options: DebugLoggerFactoryOptions) {
    this.rootPath = options.rootPath;

    this.winstonLogger = createLogger({
      format: format.combine(format.colorize(), format.timestamp(), format.ms(), format.simple()),
      level: options.level,
      transports: [new transports.Console()],
    });
  }

  private readonly rootPath: string;
  private readonly winstonLogger: WinstonLogger;
}
