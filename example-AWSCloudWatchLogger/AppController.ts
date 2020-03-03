import { Controller, Inject, Put } from "@nestjs/common";
import { LoggerFactory, LoggerFactoryIoCAnchor } from "../lib";

@Controller("/")
export class AppController {
  @Put()
  public async update(): Promise<any[]> {
    this.logger.error(`This is error.`);
    this.logger.warn(`This is warn.`);
    this.logger.info(`This is info.`);
    this.logger.debug(`This is debug.`);

    return [];
  }

  constructor(@Inject(LoggerFactoryIoCAnchor) private loggerFactory: LoggerFactory) {}

  private logger = this.loggerFactory.generate({
    issuerFilename: __filename,
  });
}
