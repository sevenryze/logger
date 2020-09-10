import { Module } from "@nestjs/common";
import { AppController } from "./AppController";
import { LoggerModule, LoggerModuleOptions } from "../lib";

async function asyncOptions(): Promise<LoggerModuleOptions> {
  await new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, 1);
  });
  return {
    type: "Debug",
    rootPath: __filename,
    level: "debug",
  };
}

@Module({
  controllers: [AppController],
  imports: [LoggerModule.forRootAsync(asyncOptions())],
})
export class AppModule {}
