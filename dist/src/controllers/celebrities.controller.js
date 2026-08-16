"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const geo_utils_1 = require("../shared/utils/geo.utils");
const CSV_PATH = (0, path_1.resolve)("./src/constants/celebrities.csv");
const CSV_HEADER = [
    "wikidata_code",
    "birth",
    "death",
    "name",
    "main_occ",
    "citizenship",
    "bplo1",
    "dplo1",
    "bpla1",
    "dpla1",
];
/**
 * minimal distance acceptable to select a celebrity
 */
const MIN_DISTANCE_ACCEPTABLE = 20;
class CelebritiesController {
    constructor() {
        this.celebrities = [];
        this._init();
    }
    _init() {
        (0, fs_1.readFile)(CSV_PATH, "utf-8", (err, data) => {
            if (!!!data || data.length <= 0) {
                console.error(`no data found at ${CSV_PATH}`);
                return;
            }
            if (!!err) {
                console.error(err);
            }
            (0, csv_parse_1.parse)(data, {
                delimiter: ";",
                columns: CSV_HEADER,
                from_line: 2,
                cast: (val, ctx) => {
                    if (!!!ctx.column || typeof ctx.column !== "string")
                        return val;
                    if (["birth", "death"].includes(ctx.column)) {
                        return parseInt(val);
                    }
                    else if (["bplo1", "dplo1", "bpla1", "dpla1"].includes(ctx.column)) {
                        return parseFloat(val);
                    }
                    else if (["name"].includes(ctx.column)) {
                        return val.split("_").join(" ");
                    }
                    return val;
                },
            }, (error, res) => {
                if (error) {
                    console.error(error);
                }
                if (Array.isArray(res)) {
                    this.celebrities = res;
                    console.log("celebrities csv loaded");
                }
            });
        });
    }
    /**
     * Get the celebrity who birth nearest from the targeted point.
     *
     * By default,
     * @param pt
     * @returns
     */
    getNearestBirthPlaceOfCelebrityFrom(pt) {
        if (this.celebrities.length <= 0) {
            throw new Error("celebrities array not loaded");
        }
        let minDistance = Infinity;
        let nearestCelebrity = this.celebrities[0];
        for (let celeb of this.celebrities) {
            const distance = geo_utils_1.GeoUtils.getDistanceBetween({ lat: celeb.bpla1, lon: celeb.bplo1 }, pt);
            if (distance < minDistance) {
                if (minDistance <= MIN_DISTANCE_ACCEPTABLE) {
                    return celeb;
                }
                minDistance = distance;
                nearestCelebrity = celeb;
            }
        }
        return nearestCelebrity;
    }
    getNearestDeathPlaceOfCelebrityFrom(pt) {
        if (this.celebrities.length <= 0) {
            throw new Error("celebrities array not loaded");
        }
        let minDistance = Infinity;
        let nearestCelebrity = this.celebrities[0];
        for (let celeb of this.celebrities) {
            const distance = geo_utils_1.GeoUtils.getDistanceBetween({ lat: celeb.dpla1, lon: celeb.dplo1 }, pt);
            if (distance < minDistance) {
                if (minDistance <= MIN_DISTANCE_ACCEPTABLE) {
                    return celeb;
                }
                minDistance = distance;
                nearestCelebrity = celeb;
            }
        }
        return nearestCelebrity;
    }
}
exports.default = new CelebritiesController();
