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
exports.CelebrityHint = void 0;
const celebrities_controller_1 = __importDefault(require("../../controllers/celebrities.controller"));
const Hint_model_1 = require("../primitives/Hint.model");
const math_utils_1 = require("../../shared/utils/math.utils");
class CelebrityHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { endingPoint, nearestFromPlace } = _a, props = __rest(_a, ["endingPoint", "nearestFromPlace"]);
        super(props);
        this.nearestFromPlace =
            nearestFromPlace !== null && nearestFromPlace !== void 0 ? nearestFromPlace : (math_utils_1.MathUtils.getRandomFloat(100) > 50 ? "birth" : "death");
        this.celebrity = this._generateCelebrity(endingPoint);
    }
    _generateCelebrity(endingPoint) {
        if (this.nearestFromPlace === "birth") {
            return celebrities_controller_1.default.getNearestBirthPlaceOfCelebrityFrom(endingPoint);
        }
        return celebrities_controller_1.default.getNearestDeathPlaceOfCelebrityFrom(endingPoint);
    }
    getOppositeMethod() {
        if (this.nearestFromPlace === "birth")
            return "death";
        return "birth";
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "celebrity-hint", celebrity: this.celebrity, nearestFromPlace: this.nearestFromPlace });
    }
}
exports.CelebrityHint = CelebrityHint;
