import { Logger } from "./Logger";

export interface LoggerFactoryGenerateOptions {
  issuerFilename: string;
}

export interface LoggerFactory {
  generate(options: LoggerFactoryGenerateOptions): Logger;
}

export const LoggerFactoryIoCAnchor = Symbol("LoggerFactoryIoCAnchor");
