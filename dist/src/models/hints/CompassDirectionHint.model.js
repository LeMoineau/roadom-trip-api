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
exports.CompassDirectionHint = void 0;
const Hint_model_1 = require("../primitives/Hint.model");
const geo_utils_1 = require("../../shared/utils/geo.utils");
const math_utils_1 = require("../../shared/utils/math.utils");
/**
 * Indice qui donne la direction précise (degrée par rapport au nord) entre le point d'arrivée
 * et soit - le point de départ - le point à l'ouverture de l'indice.
 *
 * Dans le DTO de cette indice, on stocke dans tous les cas l'information de la direction précise
 * entre le point de départ et le point d'arrivée au cas où on serait dans la méthode via point
 * à l'ouverture de l'indice et qu'il y aurait un problème à ce moment là (récupération de la position
 * ou autre)
 */
class CompassDirectionHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { endingPoint, startingPoint, method } = _a, props = __rest(_a, ["endingPoint", "startingPoint", "method"]);
        super(props);
        this.direction = this._generateDirection(startingPoint, endingPoint);
        this.method =
            method !== null && method !== void 0 ? method : (math_utils_1.MathUtils.getRandomFloat(100) > 50
                ? "from-opened-hint-pt"
                : "from-starting-pt");
    }
    _generateDirection(startingPoint, endingPoint) {
        return geo_utils_1.GeoUtils.bearing(startingPoint, endingPoint);
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "compass-direction-hint", direction: this.direction, from: "north", method: this.method });
    }
}
exports.CompassDirectionHint = CompassDirectionHint;
