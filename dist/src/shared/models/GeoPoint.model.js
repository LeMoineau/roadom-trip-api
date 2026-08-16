"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoPoint = void 0;
class GeoPoint {
    constructor(props) {
        this.lat = props.lat;
        this.lon = props.lon;
        this.label = props.label;
    }
    get displayIcon() {
        var _a, _b, _c;
        if ((_a = this.label) === null || _a === void 0 ? void 0 : _a.includes("Abandon"))
            return "🏳️";
        if ((_b = this.label) === null || _b === void 0 ? void 0 : _b.includes("Fin"))
            return "🏁";
        if ((_c = this.label) === null || _c === void 0 ? void 0 : _c.includes("Début"))
            return "🏠";
    }
    toDto() {
        return {
            lat: this.lat,
            lon: this.lon,
            label: this.label,
        };
    }
}
exports.GeoPoint = GeoPoint;
