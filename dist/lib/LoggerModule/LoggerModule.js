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
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const LoggerModuleOptions_1 = require("./LoggerModuleOptions");
const DebugLoggerFactory_1 = require("./Implementation/Debug/DebugLoggerFactory");
const AWSCloudWatchLoggerFactory_1 = require("./Implementation/AWS-CloudWatch/AWSCloudWatchLoggerFactory");
const LoggerFactory_1 = require("./LoggerFactory");
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot(options) {
        let implementationConstructor;
        switch (options.type) {
            case "AWS-CloudWatch":
                implementationConstructor = AWSCloudWatchLoggerFactory_1.AWSCloudWatchLoggerFactory;
                break;
            case "Aliyun-SLS":
                throw new Error(`Not implemented.`);
            case "Debug":
                implementationConstructor = DebugLoggerFactory_1.DebugLoggerFactory;
                break;
            default:
                throw new Error(`Get invalid logger type.`);
        }
        const loggerFactoryProvider = {
            provide: LoggerFactory_1.LoggerFactoryIoCAnchor,
            useClass: implementationConstructor,
        };
        return {
            module: LoggerModule_1,
            providers: [
                {
                    provide: LoggerModuleOptions_1.LoggerModuleOptionsIoCAnchor,
                    useValue: options,
                },
                loggerFactoryProvider,
            ],
            exports: [loggerFactoryProvider],
        };
    }
    constructor() { }
};
LoggerModule = LoggerModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({}),
    __metadata("design:paramtypes", [])
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=LoggerModule.js.map