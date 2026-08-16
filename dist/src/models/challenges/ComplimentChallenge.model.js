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
exports.ComplimentChallenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
class ComplimentChallenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var props = __rest(_a, []);
        super(props);
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "compliment-challenge", message: "Si tu vas voir 1 personne pour lui dire un compliment, tu peux lui demander de t'aider !", reward: "ask-1-person", nbOfUses: 3, photos: "optional" });
    }
}
exports.ComplimentChallenge = ComplimentChallenge;
