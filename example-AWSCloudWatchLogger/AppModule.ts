import { Module } from "@nestjs/common";
import { AppController } from "./AppController";
import { LoggerModule } from "../lib";

@Module({
  controllers: [AppController],
  imports: [
    LoggerModule.forRoot({
      type: "AWS-CloudWatch",
      rootPath: __filename,
      region: process.env.AWS_region!,
      accessKeyId: process.env.AWS_accessKeyId!,
      secretAccessKey: process.env.AWS_secretAccessKey!,
      streamName: "local-stream",
      groupName: "local",
      level: "debug",
      printToConsole: true,
      localBackup: {
        dir: `${__dirname}/../log`,
        isActive: true,
        retentionDays: 15,
      },
    }),
  ],
})
export class AppModule {}
