import { AWSCloudWatchLoggerFactoryOptions } from "./Implementation/AWS-CloudWatch/AWSCloudWatchLoggerFactory";
import { DebugLoggerFactoryOptions } from "./Implementation/Debug/DebugLoggerFactory";

interface AWSCloudWatchOptions extends AWSCloudWatchLoggerFactoryOptions {
  type: "AWS-CloudWatch";
}

interface AliyunSLSOptions {
  type: "Aliyun-SLS";
}

interface DebugOptions extends DebugLoggerFactoryOptions {
  type: "Debug";
}

export type LoggerModuleOptions = AWSCloudWatchOptions | DebugOptions | AliyunSLSOptions;

export const LoggerModuleOptionsIoCAnchor = Symbol("LoggerModuleOptionsIoCAnchor");
