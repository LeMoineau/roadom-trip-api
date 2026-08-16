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
exports.StateProductChallenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
class StateProductChallenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var { stateLibelle, rewardedHint } = _a, props = __rest(_a, ["stateLibelle", "rewardedHint"]);
        super(props);
        this.message = this._generateMessage(stateLibelle);
        this.rewardedHint = rewardedHint;
    }
    _generateMessage(stateLibelle) {
        return `Si tu trouves un produit de la région ${stateLibelle}, tu obtiendras un indice du niveau supérieur !`;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "state-product-challenge", message: this.message, reward: this.rewardedHint, nbOfUses: 1, photos: "needed", minPhotos: 1 });
    }
}
exports.StateProductChallenge = StateProductChallenge;
