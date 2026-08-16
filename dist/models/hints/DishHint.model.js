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
exports.DishHint = void 0;
const Hint_model_1 = require("../primitives/Hint.model");
const dishes_controller_1 = __importDefault(require("../../controllers/dishes.controller"));
const DEFAULT_DISH = {
    name: "unknown",
    desc: "no dish found for the ending state",
};
/**
 * Hint which give a dish according to ending state
 */
class DishHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { state } = _a, props = __rest(_a, ["state"]);
        super(props);
        this.dish = this._generateDish(state);
    }
    /**
     * Genere un type de chaussure a partir du climat du département de l'arrivée
     * @param endingPos
     * @returns
     */
    _generateDish(state) {
        const dish = dishes_controller_1.default.get({ state: state.trim() });
        if (!!!dish) {
            console.warn(`no dish found for state "${state}"`);
        }
        return dish !== null && dish !== void 0 ? dish : DEFAULT_DISH;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "dish-hint", dish: this.dish });
    }
}
exports.DishHint = DishHint;
