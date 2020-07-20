"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class DebugLogger {
    constructor(options) {
        this.rootPath = options.rootPath;
        this.filePath = options.filePath;
        this.fileRelativePath = path_1.default.relative(this.rootPath, this.filePath).replace(/\\/g, "/");
        this.winstonLogger = options.winstonLogger;
    }
    error(message, metadata) {
        this.winstonLogger.error(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
    }
    warn(message, metadata) {
        this.winstonLogger.warn(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
    }
    info(message, metadata) {
        this.winstonLogger.info(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
    }
    debug(message, metadata) {
        this.winstonLogger.debug(DebugLogger.getFormatMessage(message), this.getFormatMetadata(metadata));
    }
    static getFormatMessage(message) {
        let result;
        try {
            result = JSON.stringify(message);
        }
        catch (error) {
            result = `JSON.stringify() error: ${error}`;
        }
        return result;
    }
    getFormatMetadata(metadata = {}) {
        return {
            ...metadata,
            loggingFilePath: this.fileRelativePath,
        };
    }
}
exports.DebugLogger = DebugLogger;
//# sourceMappingURL=DebugLogger.js.map