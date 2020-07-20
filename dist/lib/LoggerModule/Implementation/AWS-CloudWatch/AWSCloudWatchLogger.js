"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class AWSCloudWatchLogger {
    constructor(options) {
        this.rootPath = options.rootPath;
        this.filePath = options.filePath;
        this.fileRelativePath = path_1.default.relative(this.rootPath, this.filePath).replace(/\\/g, "/");
        this.winstonLogger = options.winstonLogger;
    }
    error(message, metadata) {
        this.winstonLogger.error(this.formatMessage(message), this.formatMetadata(metadata));
    }
    warn(message, metadata) {
        this.winstonLogger.warn(this.formatMessage(message), this.formatMetadata(metadata));
    }
    info(message, metadata) {
        this.winstonLogger.info(this.formatMessage(message), this.formatMetadata(metadata));
    }
    debug(message, metadata) {
        this.winstonLogger.debug(this.formatMessage(message), this.formatMetadata(metadata));
    }
    formatMessage(message) {
        return message;
    }
    formatMetadata(metadata = {}) {
        return {
            ...metadata,
            loggingFilePath: this.fileRelativePath,
        };
    }
}
exports.AWSCloudWatchLogger = AWSCloudWatchLogger;
//# sourceMappingURL=AWSCloudWatchLogger.js.map