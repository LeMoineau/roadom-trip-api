"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoUtils = void 0;
const math_utils_1 = require("./math.utils");
const geolib = __importStar(require("geolib"));
const earth_seas_10m_1 = __importDefault(require("@geo-maps/earth-seas-10m"));
const geojson_geometries_lookup_1 = __importDefault(require("geojson-geometries-lookup"));
const GeoPoint_model_1 = require("../models/GeoPoint.model");
// Loading the sea map
const seaMap = new geojson_geometries_lookup_1.default(earth_seas_10m_1.default);
var GeoUtils;
(function (GeoUtils) {
    /**
     * Get rectangle extrems N-E & S-O of distance {distance} km
     * @param pt1 center of rect
     * @param distance distance around point in km
     */
    function getBoundsOfDistance(pt1, distance) {
        const bounds = geolib.getBoundsOfDistance(pt1, distance * 1000);
        return [
            new GeoPoint_model_1.GeoPoint({ lat: bounds[0].latitude, lon: bounds[0].longitude }),
            new GeoPoint_model_1.GeoPoint({ lat: bounds[1].latitude, lon: bounds[1].longitude }),
        ];
    }
    GeoUtils.getBoundsOfDistance = getBoundsOfDistance;
    /**
     * Get a random geopoint between two points
     * @param pt1
     * @param pt2
     * @returns
     */
    function getRandomPointBetween(pt1, pt2) {
        return new GeoPoint_model_1.GeoPoint({
            lat: math_utils_1.MathUtils.getRandomFloat(Math.max(pt1.lat, pt2.lat), Math.min(pt1.lat, pt1.lat)),
            lon: math_utils_1.MathUtils.getRandomFloat(Math.max(pt1.lon, pt2.lon), Math.min(pt1.lon, pt1.lon)),
        });
    }
    GeoUtils.getRandomPointBetween = getRandomPointBetween;
    /**
     * Get distance between 2 points in km
     * @param pt1
     * @param pt2
     * @returns distance between the 2 points in km
     */
    function getDistanceBetween(pt1, pt2) {
        return geolib.getDistance(pt1, pt2) / 1000;
    }
    GeoUtils.getDistanceBetween = getDistanceBetween;
    /**
     * Check if the given point is in the sea or not.
     * @param {GeoPoint} pt point to check
     * @return {boolean} True if the point is in the sea, false otherwise.
     */
    function isInSea(pt) {
        return seaMap.hasContainers({
            type: "Point",
            coordinates: [pt.lon, pt.lat],
        });
    }
    GeoUtils.isInSea = isInSea;
    /**
     * Convert a degree lat/lon to radian
     * @param degrees
     * @returns
     */
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
    GeoUtils.toRadians = toRadians;
    /**
     * Convert a degree lat/lon to radian
     * @param radians
     * @returns
     */
    function toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }
    GeoUtils.toDegrees = toDegrees;
    /**
     * Calculate the angle from north in degree between 2 points
     * @param startLat
     * @param startLng
     * @param destLat
     * @param destLng
     * @returns degree from north from starting point to destination point
     */
    function bearing(startingPoint, destinationPoint) {
        const startLat = toRadians(startingPoint.lat);
        const startLng = toRadians(startingPoint.lon);
        const destLat = toRadians(destinationPoint.lat);
        const destLng = toRadians(destinationPoint.lon);
        const y = Math.sin(destLng - startLng) * Math.cos(destLat);
        const x = Math.cos(startLat) * Math.sin(destLat) -
            Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        const brng = Math.atan2(y, x);
        return (toDegrees(brng) + 360) % 360;
    }
    GeoUtils.bearing = bearing;
    /**
     * Get the middle point between 2 points
     * @param pt1
     * @param pt2
     * @returns
     */
    function getMiddlePoint(pt1, pt2) {
        return new GeoPoint_model_1.GeoPoint({
            lat: (pt1.lat + pt2.lat) / 2,
            lon: (pt1.lon + pt2.lon) / 2,
        });
    }
    GeoUtils.getMiddlePoint = getMiddlePoint;
})(GeoUtils || (exports.GeoUtils = GeoUtils = {}));
