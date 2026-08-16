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
exports.NoseChallenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
const math_utils_1 = require("../../shared/utils/math.utils");
class NoseChallenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var { variants } = _a, props = __rest(_a, ["variants"]);
        super(props);
        this.variants =
            variants !== null && variants !== void 0 ? variants : (math_utils_1.MathUtils.getRandomFloat(100) > 50 ? "nose" : "hat");
    }
    _generateMessage() {
        return `Appuie sur le ${this.variants === "nose" ? "nez" : "chapeau"} à chaque fois que les heures et les minutes indiquent le même nombre pour avoir le droit de parler à 1 personne !`;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "nose-challenge", message: this._generateMessage(), variants: this.variants, reward: "ask-1-person", nbOfUses: "infinite", photos: "optional" });
    }
}
exports.NoseChallenge = NoseChallenge;
