"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const climats_1 = require("../constants/climats");
class ClimatsController {
    constructor() { }
    get({ departementCode, }) {
        var _a;
        return (_a = climats_1.climats.find((c) => c.departements.includes(departementCode))) === null || _a === void 0 ? void 0 : _a.climat;
    }
}
exports.default = new ClimatsController();
