import { Logger } from "./Logger";
import { ConstructorType } from "./Helper/ConstructorType";

export interface LoggerFactoryGenerateOptions {
  issuerFilename: string;
}

export interface LoggerFactory {
  generate(options: LoggerFactoryGenerateOptions): Logger;
  cleanup(): Promise<void>;
}

export const LoggerFactoryIoCAnchor = Symbol("LoggerFactoryIoCAnchor");

export type LoggerFactoryConstructor = ConstructorType<LoggerFactory>;
