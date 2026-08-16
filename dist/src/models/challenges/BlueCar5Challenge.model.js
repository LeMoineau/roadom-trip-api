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
exports.BlueCar5Challenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
class BlueCar5Challenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var props = __rest(_a, []);
        super(props);
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "5-blue-car-challenge", message: "Prends en photo 5 voitures bleues pour avoir le droit de parler à 1 personne !", reward: "ask-1-person", photos: "optional", nbOfUses: 1 });
    }
}
exports.BlueCar5Challenge = BlueCar5Challenge;
