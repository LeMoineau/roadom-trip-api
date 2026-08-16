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
exports.NearCityHint = void 0;
const Hint_model_1 = require("../primitives/Hint.model");
class NearCityHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { city } = _a, props = __rest(_a, ["city"]);
        super(props);
        this.city = city;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "near-city-hint", message: `La ville "${this.city}" est juste à côté de votre destination !`, city: this.city });
    }
}
exports.NearCityHint = NearCityHint;
