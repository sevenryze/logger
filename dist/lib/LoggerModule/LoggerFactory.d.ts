import { Logger } from "./Logger";
export interface LoggerFactoryGenerateOptions {
    issuerFilename: string;
}
export interface LoggerFactory {
    generate(options: LoggerFactoryGenerateOptions): Logger;
}
export declare const LoggerFactoryIoCAnchor: unique symbol;
//# sourceMappingURL=LoggerFactory.d.ts.map