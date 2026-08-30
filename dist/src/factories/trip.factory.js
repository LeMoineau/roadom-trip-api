"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geo_utils_1 = require("../shared/utils/geo.utils");
const GeoPoint_model_1 = require("../shared/models/GeoPoint.model");
const Trip_model_1 = require("../models/primitives/Trip.model");
const steps_factory_1 = __importDefault(require("./steps.factory"));
const osm_service_1 = __importDefault(require("../services/osm.service"));
const osrm_service_1 = __importDefault(require("../services/osrm.service"));
const google_maps_service_1 = __importDefault(require("../services/google-maps.service"));
const crypto_1 = require("crypto");
const DEFAULT_STARTING_POS_LABEL = "Point de départ";
const DEFAULT_ENDING_POS_LABEL = "Destination";
const MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS = 5;
class TripFactory {
    /**
     * Create a trip from a CreatingTripRequest
     *
     * By default, a startingPos label will be set to {DEFAULT_STARTING_POS_LABEL} and a endingPos
     * label to {DEFAULT_ENDING_POS_LABEL}.
     * @param req
     * @returns
     */
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const tripId = (0, crypto_1.randomUUID)();
            console.debug(`trip #${tripId}: begin generating...`);
            // Generate ending pos
            let endingPos;
            let osmEndingDetails;
            if (!!req.endingPos) {
                console.debug(`trip #${tripId}: getting ending pos from request...`);
                endingPos = new GeoPoint_model_1.GeoPoint(req.endingPos);
                osmEndingDetails = yield osm_service_1.default.reverse({
                    lat: endingPos.lat,
                    lon: endingPos.lon,
                });
            }
            else {
                console.debug(`trip #${tripId}: generating ending pos...`);
                endingPos = this._getRandomPointInAllowedDistance(req);
                let attempts = 1;
                while (!!!osmEndingDetails &&
                    attempts < MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS) {
                    while (geo_utils_1.GeoUtils.isInSea(endingPos)) {
                        endingPos = this._getRandomPointInAllowedDistance(req);
                    }
                    osmEndingDetails = yield osm_service_1.default.reverse({
                        lat: endingPos.lat,
                        lon: endingPos.lon,
                    });
                    if (!!req.allowNoInformationsEnding) {
                        break;
                    }
                    if (!!!(osmEndingDetails === null || osmEndingDetails === void 0 ? void 0 : osmEndingDetails.address.village)) {
                        attempts++;
                        osmEndingDetails = undefined;
                        endingPos = this._getRandomPointInAllowedDistance(req);
                    }
                }
                endingPos.label = DEFAULT_ENDING_POS_LABEL;
                console.debug(`trip #${tripId}: destination found after ${attempts} attempts`);
            }
            // Generate trip instance
            const trip = new Trip_model_1.Trip({
                id: tripId,
                startingPos: Object.assign({ label: DEFAULT_STARTING_POS_LABEL }, req.startingPos),
                endingPos: endingPos.toDto(),
                createdAt: new Date(),
                osmEndingDetails,
                route: yield this._generateTripRoute(req.startingPos, endingPos),
            });
            // Generate trip steps
            trip.steps = yield steps_factory_1.default.create(trip);
            console.debug(`trip #${tripId}: generation done!`);
            return trip;
        });
    }
    _generateTripRoute(startingPos, endingPos) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = [startingPos.lat, startingPos.lon];
            const destination = [endingPos.lat, endingPos.lon];
            const route = yield osrm_service_1.default.getRoute({
                origin,
                destination,
            });
            if (!!route) {
                return {
                    source: "osrm",
                    route,
                };
            }
            const mapsRoute = yield google_maps_service_1.default.getRoute({
                origin,
                destination,
            });
            if (!!mapsRoute) {
                return {
                    source: "google-maps",
                    route: mapsRoute,
                };
            }
        });
    }
    _getRandomPointInAllowedDistance(req) {
        if (!!!req.distanceMax) {
            throw new Error("distance max not defined");
        }
        const startingPos = new GeoPoint_model_1.GeoPoint(req.startingPos);
        const bounds = geo_utils_1.GeoUtils.getBoundsOfDistance(startingPos, req.distanceMax);
        let endingPos = geo_utils_1.GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
        let distanceTrip = geo_utils_1.GeoUtils.getDistanceBetween(startingPos, endingPos);
        while (distanceTrip > req.distanceMax ||
            (req.distanceMin && distanceTrip < req.distanceMin)) {
            endingPos = geo_utils_1.GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
            distanceTrip = geo_utils_1.GeoUtils.getDistanceBetween(startingPos, endingPos);
        }
        return endingPos;
    }
}
exports.default = new TripFactory();
