import { resolve } from "path";
import { readFile } from "fs";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { parse } from "csv-parse";
import { GeoUtils } from "../shared/utils/geo.utils";
import { Celebrity } from "../shared/types/metier/Celebrity";

const CSV_PATH = resolve(__dirname, "./../constants/celebrities.csv");
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

class CelebritiesController {
  celebrities: Celebrity[];

  constructor() {
    this.celebrities = [];
    this._init();
  }

  _init() {
    readFile(CSV_PATH, "utf-8", (err, data) => {
      if (!!!data || data.length <= 0) {
        console.error(`no data found at ${CSV_PATH}`);
        return;
      }
      if (!!err) {
        console.error(err);
      }
      parse(
        data,
        {
          delimiter: ";",
          columns: CSV_HEADER,
          from_line: 2,
          cast: (val, ctx) => {
            if (!!!ctx.column || typeof ctx.column !== "string") return val;
            if (["birth", "death"].includes(ctx.column)) {
              return parseInt(val);
            } else if (
              ["bplo1", "dplo1", "bpla1", "dpla1"].includes(ctx.column)
            ) {
              return parseFloat(val);
            } else if (["name"].includes(ctx.column)) {
              return val.split("_").join(" ");
            }
            return val;
          },
        },
        (error, res: Celebrity[]) => {
          if (error) {
            console.error(error);
          }
          if (Array.isArray(res)) {
            this.celebrities = res;
            console.log("celebrities csv loaded");
          }
        },
      );
    });
  }

  getNearestBirthPlaceOfCelebrityFrom(pt: GeoPoint): Celebrity {
    if (this.celebrities.length <= 0) {
      throw new Error("celebrities array not loaded");
    }
    const sorted = [...this.celebrities].sort(
      (a, b) =>
        GeoUtils.getDistanceBetween(
          new GeoPoint({ lat: a.bpla1, lon: a.bplo1 }),
          pt,
        ) -
        GeoUtils.getDistanceBetween(
          new GeoPoint({ lat: b.bpla1, lon: b.bplo1 }),
          pt,
        ),
    );
    return sorted[0];
  }

  getNearestDeathPlaceOfCelebrityFrom(pt: GeoPoint): Celebrity {
    if (this.celebrities.length <= 0) {
      throw new Error("celebrities array not loaded");
    }
    const sorted = [...this.celebrities]
      .filter((c) => !!c.dpla1 && !!c.dplo1)
      .sort(
        (a, b) =>
          GeoUtils.getDistanceBetween(
            new GeoPoint({ lat: a.dpla1!, lon: a.dplo1! }),
            pt,
          ) -
          GeoUtils.getDistanceBetween(
            new GeoPoint({ lat: b.dpla1!, lon: b.dplo1! }),
            pt,
          ),
      );
    return sorted[0];
  }
}

export default new CelebritiesController();
