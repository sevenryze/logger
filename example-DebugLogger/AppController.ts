import { Controller, Inject, Put } from "@nestjs/common";
import { LoggerFactory, LoggerFactoryIoCAnchor } from "../lib";

@Controller("/")
export class AppController {
  @Put()
  public async update(): Promise<any[]> {
    this.logger.error(`This is error.`);
    this.logger.warn(`This is warn.`, {
      correlationId: "12",
    });
    this.logger.info(`This is info.`, {
      correlationId: "12",
    });
    this.logger.debug(`This is debug.`, {
      correlationId: "12",
    });

    this.logger.info(JSON.stringify("This is message re-processes with JSON.stringify()"));
    this.logger.info(
      `This is message re-processes with JSON.stringify(): ${JSON.stringify({
        test: 123,
        haha: "sdfsf",
      })}`
    );
    this.logger.info(
      `This is message embedded with object: ${{
        test: 123,
        haha: "sdfsf",
      }}`
    );

    this.logger.info(`This is message with metadata.`, {
      correlationId: "ssfafasfafasf",
    });

    this.logger.info({
      test: "This is a message of object",
    });

    this.logger.info(
      {
        test: "This is a message of object and metadata",
      },
      {
        correlationId: "sfsfsfsfsdf",
      }
    );

    this.logger.info(
      {
        test: "This is a message of complex object and metadata",
        adf: [
          {
            sdfsdf: 1212,
            sfsf: {
              sdfsf: 2324,
            },
          },
          {
            sdfsf: 2323,
          },
          323,
          new Date(),
        ],
      },
      {
        correlationId: "sfsfsfsfsdf",
      }
    );

    return [];
  }

  constructor(@Inject(LoggerFactoryIoCAnchor) private loggerFactory: LoggerFactory) {}

  private logger = this.loggerFactory.generate({
    issuerFilename: __filename,
  });
}
