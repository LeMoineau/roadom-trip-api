"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagHint = void 0;
const flags_controller_1 = __importDefault(require("../../controllers/flags.controller"));
const Hint_model_1 = require("../primitives/Hint.model");
const NOT_FOUND_FLAG_URL = "https://www.svgrepo.com/show/398539/unknown-flag.svg";
class FlagHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { departementCode } = _a, props = __rest(_a, ["departementCode"]);
        super(props);
        const { flagURL, thumbURL } = this._generateFlagUrls(departementCode);
        this.flagURL = flagURL;
        this.thumbURL = thumbURL;
    }
    _generateFlagUrls(departementCode) {
        const res = flags_controller_1.default.get({ departementCode });
        if (res)
            return res;
        console.warn(`flag not found for departement code ${departementCode}`);
        return {
            flagURL: NOT_FOUND_FLAG_URL,
            thumbURL: NOT_FOUND_FLAG_URL,
        };
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "departement-flag-hint", flagURL: this.flagURL, thumbURL: this.thumbURL });
    }
}
exports.FlagHint = FlagHint;
