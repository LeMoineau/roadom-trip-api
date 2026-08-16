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
const wmo_code_service_1 = __importDefault(require("./wmo-code.service"));
class OpenWeatherService {
    constructor() {
        this.baseURL = config_1.default.getEnv().openWeatherApiURL;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
    }
    getForecast(_a) {
        return __awaiter(this, arguments, void 0, function* ({ lat, lon, }) {
            const params = {
                latitude: lat,
                longitude: lon,
                current_weather: true,
                timezone: "Europe/Paris",
            };
            const data = yield this.instance
                .get("/forecast", {
                params,
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.error("error getting forecast data for input: ", params, res.data);
                    return;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting open-weather forecast data for input: ", params, err);
                return undefined;
            });
            if (!!!data)
                return;
            const wmoCode = data.current_weather.weathercode;
            return {
                units: data.current_weather_units,
                values: Object.assign(Object.assign({}, data.current_weather), { weatherIcon: wmo_code_service_1.default.getIcon(wmoCode), weatherLibelle: wmo_code_service_1.default.getLibelle(wmoCode) }),
            };
        });
    }
}
exports.default = new OpenWeatherService();
