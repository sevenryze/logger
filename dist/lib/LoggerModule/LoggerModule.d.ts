import { DynamicModule } from "@nestjs/common";
import { LoggerModuleOptions } from "./LoggerModuleOptions";
export declare class LoggerModule {
    static forRoot(options: LoggerModuleOptions): DynamicModule;
    static forRootAsync(options: Promise<LoggerModuleOptions>): DynamicModule;
    constructor();
}
//# sourceMappingURL=LoggerModule.d.ts.map