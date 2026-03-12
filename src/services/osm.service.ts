import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { OSMResponse } from "../shared/types/osm/OSMResponse";

/**
 * Service Open Street Map
 * @see https://nominatim.org/release-docs/latest/api/Overview/
 */
class OSMService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().openStreetMapURL;
    this.instance = axios.create({
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
   * @returns OSMResponse corresponding to lat/lon coords or undefined if error during axios request
   */
  async reverse({
    zoom = 18,
    format = "json",
    ...params
  }: {
    lat: number;
    lon: number;
    zoom?: number;
    format?: string;
  }): Promise<OSMResponse | undefined> {
    return this.instance
      .get("/reverse", {
        params: {
          zoom,
          format,
          ...params,
        },
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "no data or error in data getting osm reverse for input: ",
            {
              zoom,
              format,
              ...params,
            },
            res.data,
          );
          return undefined;
        }
        return res.data as OSMResponse;
      })
      .catch((err) => {
        console.error(
          "error getting osm reverse data for input: ",
          {
            zoom,
            format,
            ...params,
          },
          err,
        );
        return undefined;
      });
  }

  /**
   * look up a location from a textual description or address.
   * Nominatim supports structured and free-form search queries.
   * @see https://nominatim.org/release-docs/latest/api/Search/
   * @returns OSMResponse corresponding to query
   */
  async search({
    format = "json",
    ...params
  }: {
    q: string;
    format?: string;
  }): Promise<OSMResponse | undefined> {
    return this.instance
      .get("/search", {
        params: {
          format,
          ...params,
        },
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "error getting osm search data for input: ",
            { format, ...params },
            res.data,
          );
          return;
        }
        return res.data as OSMResponse;
      });
  }
}

export default new OSMService();
