"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSCloudWatchLoggerFactory = void 0;
const AWSCloudWatchLogger_1 = require("./AWSCloudWatchLogger");
const common_1 = require("@nestjs/common");
const LoggerModuleOptions_1 = require("../../LoggerModuleOptions");
const winston_1 = require("winston");
const fs_extra_1 = __importDefault(require("fs-extra"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
let AWSCloudWatchLoggerFactory = class AWSCloudWatchLoggerFactory {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f;
        this.options = options;
        this.rootPath = options.rootPath;
        this.winstonLogger = winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            level: options.level,
        });
        if (((_a = options.localBackup) === null || _a === void 0 ? void 0 : _a.isActive) && ((_b = options.localBackup) === null || _b === void 0 ? void 0 : _b.dir)) {
            console.log(`Ensure the local backup log directory exists: ${(_c = options.localBackup) === null || _c === void 0 ? void 0 : _c.dir}`);
            fs_extra_1.default.ensureDirSync((_d = options.localBackup) === null || _d === void 0 ? void 0 : _d.dir, {
                mode: 0o2777,
            });
            this.winstonLogger.add(new winston_daily_rotate_file_1.default({
                datePattern: "YYYY-MM-DD",
                filename: `${(_e = options.localBackup) === null || _e === void 0 ? void 0 : _e.dir}/error-%DATE%.log`,
                level: "error",
                maxFiles: `${options.localBackup.retentionDays}d`,
                zippedArchive: true,
            }));
            this.winstonLogger.add(new winston_daily_rotate_file_1.default({
                datePattern: "YYYY-MM-DD",
                filename: `${(_f = options.localBackup) === null || _f === void 0 ? void 0 : _f.dir}/combined-%DATE%.log`,
                maxFiles: `${options.localBackup.retentionDays}d`,
                zippedArchive: true,
            }));
        }
        if (options.printToConsole) {
            console.log(`Print to console.`);
            this.winstonLogger.add(new winston_1.transports.Console());
        }
        console.log(`Add AWS CloudWatch logger.`);
        this.winstonLogger.add(new winston_cloudwatch_1.default({
            level: options.level,
            logGroupName: options.groupName,
            logStreamName: options.streamName,
            awsAccessKeyId: options.accessKeyId,
            awsSecretKey: options.secretAccessKey,
            awsRegion: options.region,
            jsonMessage: true,
        }));
    }
    generate(options) {
        return new AWSCloudWatchLogger_1.AWSCloudWatchLogger({
            filePath: options.issuerFilename,
            rootPath: this.rootPath,
            winstonLogger: this.winstonLogger,
        });
    }
    onModuleDestroy() {
        return this.flushAndExit();
    }
    flushAndExit() {
        return new Promise(resolve => {
            const transport = this.winstonLogger.transports.find((t) => t.name === "CloudWatch");
            if (transport) {
                transport.kthxbye(() => {
                    console.info("Logs were successfully flushed to CloudWatch.");
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
};
AWSCloudWatchLoggerFactory = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(LoggerModuleOptions_1.LoggerModuleOptionsIoCAnchor)),
    __metadata("design:paramtypes", [Object])
], AWSCloudWatchLoggerFactory);
exports.AWSCloudWatchLoggerFactory = AWSCloudWatchLoggerFactory;
//# sourceMappingURL=AWSCloudWatchLoggerFactory.js.map