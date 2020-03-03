import { AWSCloudWatchLoggerFactoryOptions } from "./Implementation/AWS-CloudWatch/AWSCloudWatchLoggerFactory";
import { DebugLoggerFactoryOptions } from "./Implementation/Debug/DebugLoggerFactory";

interface LoggerModuleOptionsForAWSCloudWatch extends AWSCloudWatchLoggerFactoryOptions {
  type: "AWS-CloudWatch";
}

interface LoggerModuleOptionsForAliyunSLS {
  type: "Aliyun-SLS";
}

interface LoggerModuleOptionsForDebug extends DebugLoggerFactoryOptions {
  type: "Debug";
}

export type LoggerModuleOptions =
  | LoggerModuleOptionsForAWSCloudWatch
  | LoggerModuleOptionsForDebug
  | LoggerModuleOptionsForAliyunSLS;

export const LoggerModuleOptionsIoCAnchor = Symbol("LoggerModuleOptionsIoCAnchor");
