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
const node_html_parser_1 = require("node-html-parser");
/**
 * Wikipedia API Service
 * @see https://www.mediawiki.org/wiki/API:Query
 */
class WikipediaService {
    constructor() {
        this.baseURL = config_1.default.getEnv().wikipediaApiURL;
        this.instance = axios_1.default.create({
            baseURL: this.baseURL,
            headers: {
                "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
            },
        });
    }
    /**
     * Get the formatted page of the target wikipedia page
     * @see https://fr.wikipedia.org/w/api.php?action=query&format=json&titles=Lalleu&prop=extracts&explaintext=false&exlimit=1&redirects=1
     * @param title target wikipedia page title
     * @returns preferred paragraphe of the target wikipedia page
     */
    getFormattedPage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, }) {
            const params = {
                action: "query",
                titles: title,
                format: "json",
                prop: "extracts",
                //explaintext: false,
                redirects: 1,
            };
            const data = yield this.instance
                .get("/api.php", {
                params,
            })
                .then((res) => {
                if (!!!res.data || !!res.data.error) {
                    console.error("no data or error in data getting wikipedia data for input: ", params, res.data);
                    return undefined;
                }
                return res.data;
            })
                .catch((err) => {
                console.error("error getting wikipedia data for input: ", params, err);
                return undefined;
            });
            if (!!!data ||
                !!!data.query ||
                !!!data.query.pages ||
                Object.keys(data.query.pages).filter((k) => k !== "-1").length <= 0) {
                console.warn(`no data or no pages in ${JSON.stringify(data)} for query ${JSON.stringify(params)}`);
                return;
            }
            const page = Object.values(data.query.pages)[0];
            if (!!!page.extract) {
                console.warn(`no extract on page ${JSON.stringify(page)} for query ${JSON.stringify(params)}`);
                return;
            }
            return this._parseWikipediaQuery(page);
        });
    }
    /**
     * Parse a wikipedia query response to formatted page
     * @param query wikipedia query response
     * @returns formatted wikipedia page containing all sections of the targeted page
     */
    _parseWikipediaQuery(query) {
        const res = [];
        let current = {
            title: "Introduction",
            paragraphes: [],
        };
        const doc = (0, node_html_parser_1.parse)(query.extract.trim().split("\\n").join(""));
        for (let c of doc.children) {
            if (c.tagName === "P" && c.textContent.trim().length > 0) {
                current.paragraphes.push(c.textContent.trim());
            }
            else if (c.tagName.includes("H")) {
                if (current.paragraphes.length > 0)
                    res.push(Object.assign({}, current));
                current = {
                    title: c.textContent,
                    paragraphes: [],
                };
            }
            else if (c.tagName === "UL") {
                current.paragraphes.push(...[...c.children].map((li) => li.textContent.trim()));
            }
        }
        if (current.paragraphes.length > 0)
            res.push(current);
        return res;
    }
}
exports.default = new WikipediaService();
