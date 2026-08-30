"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreatingTripRequest = isCreatingTripRequest;
const GeoPoint_dto_1 = require("../geo/GeoPoint.dto");
function isCreatingTripRequest(req) {
    return (!!req &&
        (0, GeoPoint_dto_1.isGeoPointDto)(req.startingPos) &&
        (!req.endingPos || (0, GeoPoint_dto_1.isGeoPointDto)(req.endingPos)) &&
        (!req.distanceMax || typeof req.distanceMax === "number") &&
        (!req.distanceMin || typeof req.distanceMin === "number"));
}
