"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTripDto = isTripDto;
const GeoPoint_dto_1 = require("../geo/GeoPoint.dto");
function isTripDto(trip) {
    return (!!trip &&
        (0, GeoPoint_dto_1.isGeoPointDto)(trip.startingPos) &&
        (0, GeoPoint_dto_1.isGeoPointDto)(trip.endingPos) &&
        !!trip.id &&
        typeof trip.id === "string" &&
        !!trip.createdAt &&
        typeof trip.createdAt === "string");
}
