import { DynamicModule, Global, Inject, Module, OnApplicationShutdown, Provider } from "@nestjs/common";
import { LoggerModuleOptions, LoggerModuleOptionsIoCAnchor } from "./LoggerModuleOptions";
import { DebugLoggerFactory } from "./Implementation/Debug/DebugLoggerFactory";
import { AWSCloudWatchLoggerFactory } from "./Implementation/AWS-CloudWatch/AWSCloudWatchLoggerFactory";
import { LoggerFactory, LoggerFactoryConstructor, LoggerFactoryIoCAnchor } from "./LoggerFactory";

@Global()
@Module({})
export class LoggerModule implements OnApplicationShutdown {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    let implementationConstructor: LoggerFactoryConstructor;
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

  async onApplicationShutdown(signal?: string): Promise<void> {
    await this.loggerFactory.cleanup();
  }

  constructor(@Inject(LoggerFactoryIoCAnchor) private readonly loggerFactory: LoggerFactory) {}
}
