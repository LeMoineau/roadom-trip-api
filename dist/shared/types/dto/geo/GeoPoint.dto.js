"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGeoPointDto = isGeoPointDto;
function isGeoPointDto(pt) {
    return (!!pt &&
        pt.lat &&
        typeof pt.lat === "number" &&
        pt.lon &&
        typeof pt.lon === "number" &&
        (!pt.label || typeof pt.label === "string"));
}
