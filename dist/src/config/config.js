"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    getEnv() {
        return {
            port: process.env.PORT,
            openStreetMapURL: process.env["OPEN_STREET_MAP_URL"],
            googleMapsApiURL: process.env["GOOGLE_MAPS_API_URL"],
            googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"],
            wikidataApiURL: process.env["WIKIDATA_API_URL"],
            wikipediaApiURL: process.env["WIKIPEDIA_API_URL"],
            openWeatherApiURL: process.env["OPEN_WEATHER_API_URL"],
            osrmApiURL: process.env["OSRM_API_URL"],
        };
    }
}
exports.default = new Config();
