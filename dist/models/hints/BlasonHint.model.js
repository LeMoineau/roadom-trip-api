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
exports.BlasonHint = void 0;
const blasons_controller_1 = __importDefault(require("../../controllers/blasons.controller"));
const Hint_model_1 = require("../primitives/Hint.model");
const NOT_FOUND_BLASON_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Unknown_escutcheon-fr.svg/960px-Unknown_escutcheon-fr.svg.png";
class BlasonHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { departementCode } = _a, props = __rest(_a, ["departementCode"]);
        super(props);
        this.blasonURL = this._generateBlasonURL(departementCode);
    }
    _generateBlasonURL(departementCode) {
        const blason = blasons_controller_1.default.get({ departementCode });
        if (blason)
            return blason.blasonURL;
        console.warn(`blason not found for departement code ${departementCode}`);
        return NOT_FOUND_BLASON_URL;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "departement-blason-hint", blasonURL: this.blasonURL });
    }
}
exports.BlasonHint = BlasonHint;
