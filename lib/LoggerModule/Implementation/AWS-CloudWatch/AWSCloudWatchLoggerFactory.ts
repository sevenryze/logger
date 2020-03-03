import { AWSCloudWatchLogger, AWSCloudWatchLoggerOptions } from "./AWSCloudWatchLogger";
import { Logger } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { Inject, Injectable } from "@nestjs/common";
import { LoggerModuleOptionsIoCAnchor } from "../../LoggerModuleOptions";

export interface AWSCloudWatchLoggerFactoryOptions extends Omit<AWSCloudWatchLoggerOptions, "filePath"> {}

@Injectable()
export class AWSCloudWatchLoggerFactory implements LoggerFactory {
  generate(options: LoggerFactoryGenerateOptions): Logger {
    this.logger = new AWSCloudWatchLogger({
      filePath: options.issuerFilename,
      ...this.options,
    });

    return this.logger;
  }

  cleanup(): Promise<void> {
    return this.logger?.flushAndExit() ?? Promise.resolve();
  }

  constructor(@Inject(LoggerModuleOptionsIoCAnchor) private options: AWSCloudWatchLoggerFactoryOptions) {
    this.rootPath = options.rootPath;
  }

  private logger?: AWSCloudWatchLogger;
  private readonly rootPath: string;
}
