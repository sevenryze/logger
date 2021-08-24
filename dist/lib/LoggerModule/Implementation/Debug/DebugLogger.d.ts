import { Logger as WinstonLogger } from "winston";
import { Logger, LoggerMessage, LoggerMetadata } from "../../Logger";
export declare class DebugLogger implements Logger {
    error(message: LoggerMessage, metadata?: LoggerMetadata): void;
    warn(message: LoggerMessage, metadata?: LoggerMetadata): void;
    info(message: LoggerMessage, metadata?: LoggerMetadata): void;
    debug(message: LoggerMessage, metadata?: LoggerMetadata): void;
    constructor(options: {
        filePath: string;
        rootPath: string;
        winstonLogger: WinstonLogger;
    });
    private readonly rootPath;
    private readonly filePath;
    private readonly fileRelativePath;
    private readonly winstonLogger;
    private static getFormatMessage;
    private getFormatMetadata;
}
//# sourceMappingURL=DebugLogger.d.ts.map