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
exports.HGBDHint = void 0;
const GeoPoint_model_1 = require("../../shared/models/GeoPoint.model");
const Hint_model_1 = require("../primitives/Hint.model");
const geo_utils_1 = require("../../shared/utils/geo.utils");
const math_utils_1 = require("../../shared/utils/math.utils");
/**
 * Points for France
 */
const HAUT_PT = new GeoPoint_model_1.GeoPoint({ lat: 50.892544, lon: 2.158307 });
const GAUCHE_PT = new GeoPoint_model_1.GeoPoint({ lat: 48.22401, lon: -3.915764 });
const BAS_PT = new GeoPoint_model_1.GeoPoint({ lat: 42.915282, lon: 2.783285 });
const DROITE_PT = new GeoPoint_model_1.GeoPoint({ lat: 46.988664, lon: 7.033357 });
/**
 * Hint which give direction in "haut", "gauche", "bas", "droite" according to :
 * - direction of ending point from starting point
 * - position of ending point in France
 */
class HGBDHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { startingPos, endingPos, methodGenerationDirection } = _a, props = __rest(_a, ["startingPos", "endingPos", "methodGenerationDirection"]);
        super(props);
        this.methodGenerationDirection =
            methodGenerationDirection !== null && methodGenerationDirection !== void 0 ? methodGenerationDirection : (math_utils_1.MathUtils.getRandomFloat(100) > 50
                ? "from-starting-pos"
                : "from-ending-pos");
        this.direction =
            this.methodGenerationDirection === "from-starting-pos"
                ? this._generateDirectionFromStartingPos(startingPos, endingPos)
                : this._generateDirectionFromEndingPos(endingPos);
    }
    /**
     * Generate direction from direction of ending pos from starting pos
     * - if ending pos is upper/north of starting pos -> "haut"
     */
    _generateDirectionFromStartingPos(startingPos, endingPos) {
        const diffX = endingPos.lon - startingPos.lon;
        const diffY = endingPos.lat - startingPos.lat;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            return diffX > 0 ? "droite" : "gauche";
        }
        return diffY > 0 ? "haut" : "bas";
    }
    /**
     * Generate direction from position of ending pos in France
     * - if ending pos is at Marseille -> "bas"
     */
    _generateDirectionFromEndingPos(endingPos) {
        const distHaut = geo_utils_1.GeoUtils.getDistanceBetween(endingPos, HAUT_PT);
        const distGauche = geo_utils_1.GeoUtils.getDistanceBetween(endingPos, GAUCHE_PT);
        const distBas = geo_utils_1.GeoUtils.getDistanceBetween(endingPos, BAS_PT);
        const distDroite = geo_utils_1.GeoUtils.getDistanceBetween(endingPos, DROITE_PT);
        const minDistance = Math.min(distHaut, distGauche, distBas, distDroite);
        if (minDistance === distHaut)
            return "haut";
        if (minDistance === distGauche)
            return "gauche";
        if (minDistance === distBas)
            return "bas";
        return "droite";
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "haut-gauche-bas-droite-hint", direction: this.direction, methodGenerationDirection: this.methodGenerationDirection });
    }
}
exports.HGBDHint = HGBDHint;
