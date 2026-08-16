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
exports.ShoesHint = void 0;
const climats_controller_1 = __importDefault(require("../../controllers/climats.controller"));
const Hint_model_1 = require("../primitives/Hint.model");
const DEFAULT_SHOES = "Chaussures de sport";
const CORRESPONDANCES_SHOES = {
    océanique: "Bottes",
    équatorial: "Tongues",
    tropical: "Tongues",
    "océanique dégradé": "Chaussures de sport",
    "semi-continental": "Sandales",
    montagnard: "Chaussures de randonnée",
    méditerranéen: "Claquettes",
};
/**
 * Hint which give a type of shoes according to ending departement
 */
class ShoesHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { departementCode } = _a, props = __rest(_a, ["departementCode"]);
        super(props);
        this.shoes = this._generateShoes(departementCode);
    }
    /**
     * Genere un type de chaussure a partir du climat du département de l'arrivée
     * @param endingPos
     * @returns
     */
    _generateShoes(departementCode) {
        if (!!!departementCode)
            return DEFAULT_SHOES;
        const climat = climats_controller_1.default.get({ departementCode });
        if (!!!climat)
            return DEFAULT_SHOES;
        return CORRESPONDANCES_SHOES[climat];
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "shoes-hint", shoes: this.shoes });
    }
}
exports.ShoesHint = ShoesHint;
