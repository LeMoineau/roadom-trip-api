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
/**
 * Service Wikidata
 * @see https://www.wikidata.org/wiki/Wikidata:Main_Page
 */
class WikidataService {
    constructor() {
        this.baseURL = config_1.default.getEnv().wikidataApiURL;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
    }
    /**
     * Get preferred claim of a target wikidata property for target wikidata pages
     * @see https://www.wikidata.org/w/api.php?action=wbgetentities&titles=Betton&sites=frwiki&props=claims&languages=fr&format=json
     * @param titles target wikidata pages titles
     * @param property target wikidata property
     * @returns preferred wikidata claim if found, else undefined
     */
    getWikidataProperties(_a) {
        return __awaiter(this, arguments, void 0, function* ({ titles, property, }) {
            const params = {
                action: "wbgetentities",
                titles,
                sites: "frwiki",
                props: "claims",
                languages: "fr",
                format: "json",
            };
            const data = yield this.instance
                .get("/api.php", {
                params,
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.error("no data or error in data getting wikidata data for input: ", params, res.data);
                    return undefined;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting wikidata data for input: ", params, err);
                return undefined;
            });
            if (!!!data || Object.keys(data.entities).length <= 0)
                return;
            const entity = Object.values(data.entities)[0];
            if (!!!entity.claims)
                return;
            const targetClaims = entity.claims[property];
            if (!!!targetClaims)
                return;
            const res = targetClaims.find((c) => c.rank === "preferred");
            if (!!res)
                return res;
            return targetClaims[targetClaims.length - 1];
        });
    }
    /**
     * Get latest population of a target city
     * @param city target city
     * @returns string describing current population (ex: +12322)
     */
    getPopulationOfCity(_a) {
        return __awaiter(this, arguments, void 0, function* ({ city, }) {
            var _b, _c;
            const populationClaim = yield this.getWikidataProperties({
                titles: city,
                property: "P1082",
            });
            if (!!!populationClaim)
                return;
            return (_c = (_b = populationClaim.mainsnak.datavalue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.amount;
        });
    }
}
exports.default = new WikidataService();
