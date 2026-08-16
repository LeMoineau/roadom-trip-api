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
exports.FuelStopChallenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
class FuelStopChallenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var props = __rest(_a, []);
        super(props);
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "fuel-stop-challenge", message: "Si tu arrives à t'arrêter sur la pompe avec nombre rond (prix ou essence) tu peux parler à 3 personnes !", reward: "ask-3-person", nbOfUses: 1, photos: "needed", minPhotos: 1 });
    }
}
exports.FuelStopChallenge = FuelStopChallenge;
