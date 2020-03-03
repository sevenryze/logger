import { DebugLogger, DebugLoggerOptions } from "./DebugLogger";
import { Logger } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { Inject, Injectable } from "@nestjs/common";
import { LoggerModuleOptionsIoCAnchor } from "../../LoggerModuleOptions";

export interface DebugLoggerFactoryOptions extends Omit<DebugLoggerOptions, "filePath"> {}

@Injectable()
export class DebugLoggerFactory implements LoggerFactory {
  generate(options: LoggerFactoryGenerateOptions): Logger {
    this.logger = new DebugLogger({
      filePath: options.issuerFilename,
      ...this.options,
    });

    return this.logger;
  }

  async cleanup(): Promise<void> {}

  constructor(@Inject(LoggerModuleOptionsIoCAnchor) private options: DebugLoggerFactoryOptions) {
    this.rootPath = options.rootPath;
  }

  private logger?: DebugLogger;
  private readonly rootPath: string;
}
