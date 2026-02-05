import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { OSMResponse } from "../shared/types/osm/OSMResponse";

/**
 * Service Open Street Map
 * @see https://nominatim.org/release-docs/latest/api
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
   * @returns OSMResponse corresponding to lat/lon coords
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
  }): Promise<OSMResponse> {
    return this.instance
      .get("/reverse", {
        params: {
          zoom,
          format,
          ...params,
        },
      })
      .then((res) => {
        return res.data as OSMResponse;
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
  }): Promise<OSMResponse> {
    return this.instance
      .get("/search", {
        params: {
          format,
          ...params,
        },
      })
      .then((res) => {
        return res.data as OSMResponse;
      });
  }
}

export default new OSMService();
