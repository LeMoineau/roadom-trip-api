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
exports.TourismHint = void 0;
const departements_1 = require("../../constants/departements");
const tourism_controller_1 = __importDefault(require("../../controllers/tourism.controller"));
const Hint_model_1 = require("../primitives/Hint.model");
const math_utils_1 = require("../../shared/utils/math.utils");
class TourismHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { endingDepartementCode, methodGenerationMessage = math_utils_1.MathUtils.getRandomFloat(100) > 50
            ? "departement-rank"
            : "most-popular-season" } = _a, props = __rest(_a, ["endingDepartementCode", "methodGenerationMessage"]);
        super(props);
        this.methodGenerationMessage = methodGenerationMessage;
        this.message =
            this.methodGenerationMessage === "departement-rank"
                ? this._generateMessageFromDepRank(endingDepartementCode)
                : this._generateMessageFromMostPopularSeason(endingDepartementCode);
    }
    /**
     * Generate a message from the popularity by year of the ending departement
     * @param departementCode ending departement
     * @returns hint message
     */
    _generateMessageFromDepRank(departementCode) {
        const rank = tourism_controller_1.default.getPopularityRankByYearOf(departementCode);
        return `Votre département d'arrivée est le ${rank}e plus populaire de France (sur ${departements_1.departements.length}) !`;
    }
    /**
     * Generate a message from most visited season of the ending departement
     * @param departementCode ending departement
     * @returns hint message
     */
    _generateMessageFromMostPopularSeason(departementCode) {
        const season = tourism_controller_1.default.getMostAttractiveSeasonOf(departementCode);
        return `C'est en ${season} que votre département d'arrivée est le plus visité !`;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "tourism-hint", message: this.message, methodGenerationMessage: this.methodGenerationMessage });
    }
}
exports.TourismHint = TourismHint;
