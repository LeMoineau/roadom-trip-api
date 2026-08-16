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
/**
 * Service Open Street Map
 * @see https://nominatim.org/release-docs/latest/api/Overview/
 */
class OSMService {
    constructor() {
        this.baseURL = config_1.default.getEnv().openStreetMapURL;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
    }
    /**
     * Reverse geocoding generates an address from a coordinate given
     * as latitude and longitude
     * @see https://nominatim.org/release-docs/latest/api/Reverse/
     * @returns OSMReverseResponse corresponding to lat/lon coords or undefined if error during axios request
     */
    reverse(_a) {
        return __awaiter(this, void 0, void 0, function* () {
            var { zoom = 17, format = "json" } = _a, props = __rest(_a, ["zoom", "format"]);
            const params = Object.assign({ zoom,
                format }, props);
            const data = yield this.instance
                .get("/reverse", {
                params,
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.warn("no data found during osm reverse", params, res);
                    return undefined;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting osm reverse data for input: ", params, err);
                return undefined;
            });
            return data;
        });
    }
    /**
     * look up a location from a textual description or address.
     * Nominatim supports structured and free-form search queries.
     * @see https://nominatim.org/release-docs/latest/api/Search/
     * @returns OSMReverseResponse corresponding to query
     */
    search(_a) {
        return __awaiter(this, void 0, void 0, function* () {
            var { format = "json" } = _a, props = __rest(_a, ["format"]);
            const params = Object.assign({ format }, props);
            const data = yield this.instance
                .get("/search", {
                params,
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.warn("no data found during osm reverse", params, res);
                    return undefined;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting osm search data for input: ", params, err);
                return undefined;
            });
            return data;
        });
    }
}
exports.default = new OSMService();
