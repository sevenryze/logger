import { Logger, LoggerLevel } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { OnModuleDestroy } from "@nestjs/common";
export interface DebugLoggerFactoryOptions {
    rootPath: string;
    level: LoggerLevel;
}
export declare class DebugLoggerFactory implements LoggerFactory, OnModuleDestroy {
    private options;
    generate(options: LoggerFactoryGenerateOptions): Logger;
    onModuleDestroy(): void;
    constructor(options: DebugLoggerFactoryOptions);
    private readonly rootPath;
    private readonly winstonLogger;
}
//# sourceMappingURL=DebugLoggerFactory.d.ts.map