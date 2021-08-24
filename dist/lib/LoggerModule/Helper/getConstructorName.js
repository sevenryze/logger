"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstructorName = void 0;
function getConstructorName(instance) {
    var _a;
    return (_a = Object.getPrototypeOf(instance)) === null || _a === void 0 ? void 0 : _a.constructor.name;
}
exports.getConstructorName = getConstructorName;
//# sourceMappingURL=getConstructorName.js.map