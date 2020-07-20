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
Object.defineProperty(exports, "__esModule", { value: true });
const DebugLogger_1 = require("./DebugLogger");
const common_1 = require("@nestjs/common");
const LoggerModuleOptions_1 = require("../../LoggerModuleOptions");
const winston_1 = require("winston");
let DebugLoggerFactory = class DebugLoggerFactory {
    constructor(options) {
        this.options = options;
        this.rootPath = options.rootPath;
        this.winstonLogger = winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.ms(), winston_1.format.simple()),
            level: options.level,
            transports: [new winston_1.transports.Console()],
        });
    }
    generate(options) {
        return new DebugLogger_1.DebugLogger({
            filePath: options.issuerFilename,
            rootPath: this.rootPath,
            winstonLogger: this.winstonLogger,
        });
    }
    onModuleDestroy() {
        console.log(`Debug logger factory disposed.`);
    }
};
DebugLoggerFactory = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(LoggerModuleOptions_1.LoggerModuleOptionsIoCAnchor)),
    __metadata("design:paramtypes", [Object])
], DebugLoggerFactory);
exports.DebugLoggerFactory = DebugLoggerFactory;
//# sourceMappingURL=DebugLoggerFactory.js.map