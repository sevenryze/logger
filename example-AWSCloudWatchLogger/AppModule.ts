import { Module } from "@nestjs/common";
import { AppController } from "./AppController";
import { LoggerModule } from "../lib";

@Module({
  controllers: [AppController],
  imports: [
    LoggerModule.forRoot({
      type: "AWS-CloudWatch",
      rootPath: __filename,
      region: "us-west-1",
      accessKeyId: "",
      secretAccessKey: "",
      streamName: "local-stream",
      groupName: "local",
      level: "debug",
      printToConsole: true,
      localBackup: {
        dir: `${__dirname}/backup`,
        isActive: true,
        retentionDays: 15,
      },
    }),
  ],
})
export class AppModule {}
