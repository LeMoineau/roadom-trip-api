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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
class OSRMService {
    constructor() {
        this.baseURL = config_1.default.getEnv().osrmApiURL;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
    }
    getRoute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ origin, destination, }) {
            try {
                const response = yield this.instance.get(`/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}`, { params: { overview: "false", geometries: "geojson", steps: "true" } });
                const data = response.data;
                if (data.code === "Ok") {
                    const route = data.routes[0];
                    console.log(`Distance: ${route.distance / 1000} km`);
                    console.log(`Temps: ${Math.round(route.duration / 60)} min`);
                    return route;
                }
            }
            catch (error) {
                console.error("Erreur lors de la requête OSRM:", error.message);
            }
        });
    }
}
exports.default = new OSRMService();
