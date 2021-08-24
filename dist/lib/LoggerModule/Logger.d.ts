export declare type LoggerMetadata = Record<string, any>;
export declare type LoggerMessage = any;
export declare type LoggerLevel = "error" | "warn" | "info" | "debug";
export interface Logger {
    error(message: LoggerMessage, metadata?: LoggerMetadata): void;
    warn(message: LoggerMessage, metadata?: LoggerMetadata): void;
    info(message: LoggerMessage, metadata?: LoggerMetadata): void;
    debug(message: LoggerMessage, metadata?: LoggerMetadata): void;
}
//# sourceMappingURL=Logger.d.ts.map