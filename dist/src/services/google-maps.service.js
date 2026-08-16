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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
//TODO: refactor with @googlemaps client methods & types
/**
 * Google Maps API (mostly Place API)
 * @see https://developers.google.com/maps/documentation/places/web-service/legacy/overview-legacy?hl=fr
 */
class GoogleMapsService {
    constructor() {
        this.baseURL = config_1.default.getEnv().googleMapsApiURL;
        this.apiKey = config_1.default.getEnv().googleMapsApiKey;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
        this.client = new google_maps_services_js_1.Client({ axiosInstance: this.instance });
    }
    /**
     * Search for places near a location (lat/lon)
     * @see https://developers.google.com/maps/documentation/places/web-service/legacy/search-nearby?hl=fr
     * @param request NearbySearchRequest
     * @returns NearbySearchResponse or undefined if error during axios request
     */
    nearbySearch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({}, request), { location: request.location.join(",") });
            return yield this.instance
                .get("/place/nearbysearch/json", {
                params: Object.assign(Object.assign({}, params), { key: this.apiKey }),
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.error("error getting nearby search data for input: ", params, res.data);
                    return;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting google-maps nearbysearch data for input: ", params, err);
                return undefined;
            });
        });
    }
    /**
     * Get details of a place by its identifier
     * @see https://developers.google.com/maps/documentation/places/web-service/legacy/details?hl=fr
     * @param place_id target place id
     * @returns PlaceDetailsResponse or undefined if error during axios request
     */
    placeDetails(_a) {
        return __awaiter(this, arguments, void 0, function* ({ placeId, }) {
            const params = {
                place_id: placeId,
            };
            return yield this.instance
                .get("/place/details/json", {
                params: Object.assign(Object.assign({}, params), { key: this.apiKey }),
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.error("error getting nearby search data for input: ", params, res.data);
                    return;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting google-maps place details data for input: ", params, err);
                return undefined;
            });
        });
    }
    /**
     * Get google maps url from place identifier
     * @param placeId target place id
     * @returns google maps url of the place
     */
    getUrlFromPlaceId(placeId) {
        return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    }
    getRoute(_a) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = __rest(_a, []);
            try {
                const response = yield this.client.directions({
                    params: Object.assign(Object.assign({}, params), { mode: google_maps_services_js_1.TravelMode.driving, language: google_maps_services_js_1.Language.fr, key: this.apiKey }),
                    timeout: 1000, // Optionnel
                });
                if (response.data.status === "OK") {
                    // Le premier itinéraire [0] est l'itinéraire conseillé
                    const route = response.data.routes[0];
                    console.log(`Itinéraire : ${route.summary}`);
                    console.log(`Distance : ${route.legs[0].distance.text}`);
                    console.log(`Durée estimée : ${route.legs[0].duration.text}`);
                    // Affichage des étapes (instructions)
                    route.legs[0].steps.forEach((step, index) => {
                        console.log(`${index + 1}. ${step.html_instructions.replace(/<[^>]*>?/gm, "")}`);
                    });
                    return route;
                }
                else {
                    console.error("Erreur API : " + response.data.status);
                }
            }
            catch (err) {
                console.error("Erreur de connexion : ", err.message);
            }
        });
    }
}
exports.default = new GoogleMapsService();
