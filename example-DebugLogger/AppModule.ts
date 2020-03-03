import { Module } from "@nestjs/common";
import { AppController } from "./AppController";
import { LoggerModule } from "../lib";

@Module({
  controllers: [AppController],
  imports: [
    LoggerModule.forRoot({
      type: "Debug",
      rootPath: __filename,
      level: "debug",
    }),
  ],
})
export class AppModule {}
