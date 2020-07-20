import { Logger, LoggerLevel } from "../../Logger";
import { LoggerFactory, LoggerFactoryGenerateOptions } from "../../LoggerFactory";
import { OnModuleDestroy } from "@nestjs/common";
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
export declare class AWSCloudWatchLoggerFactory implements LoggerFactory, OnModuleDestroy {
    private options;
    generate(options: LoggerFactoryGenerateOptions): Logger;
    onModuleDestroy(): Promise<void>;
    constructor(options: AWSCloudWatchLoggerFactoryOptions);
    private readonly rootPath;
    private readonly winstonLogger;
    private flushAndExit;
}
//# sourceMappingURL=AWSCloudWatchLoggerFactory.d.ts.map