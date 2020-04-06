import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { LoggerModuleOptions, LoggerModuleOptionsIoCAnchor } from "./LoggerModuleOptions";
import { DebugLoggerFactory } from "./Implementation/Debug/DebugLoggerFactory";
import { AWSCloudWatchLoggerFactory } from "./Implementation/AWS-CloudWatch/AWSCloudWatchLoggerFactory";
import { LoggerFactory, LoggerFactoryIoCAnchor } from "./LoggerFactory";
import { ConstructorType } from "./Helper/ConstructorType";

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    let implementationConstructor: ConstructorType<LoggerFactory>;
    switch (options.type) {
      case "AWS-CloudWatch":
        implementationConstructor = AWSCloudWatchLoggerFactory;
        break;
      case "Aliyun-SLS":
        throw new Error(`Not implemented.`);
      case "Debug":
        implementationConstructor = DebugLoggerFactory;
        break;
      default:
        throw new Error(`Get invalid logger type.`);
    }

    const loggerFactoryProvider: Provider = {
      provide: LoggerFactoryIoCAnchor,
      useClass: implementationConstructor,
    };

    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerModuleOptionsIoCAnchor,
          useValue: options,
        },
        loggerFactoryProvider,
      ],
      exports: [loggerFactoryProvider],
    };
  }

  constructor() {}
}
