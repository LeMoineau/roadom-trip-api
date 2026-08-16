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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityPopulationHint = void 0;
const Hint_model_1 = require("../primitives/Hint.model");
class CityPopulationHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { population } = _a, props = __rest(_a, ["population"]);
        super(props);
        this.population = population;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "city-population-hint", population: this.population, message: `La population de votre ville d'arrivée est : ${this.population}` });
    }
}
exports.CityPopulationHint = CityPopulationHint;
