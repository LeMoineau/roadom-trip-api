import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { OSMReverseResponse } from "../shared/types/osm/OSMReverseResponse";

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
   * @returns OSMReverseResponse corresponding to lat/lon coords or undefined if error during axios request
   */
  async reverse({
    zoom = 17,
    format = "json",
    ...props
  }: {
    lat: number;
    lon: number;
    zoom?: number;
    format?: string;
  }): Promise<OSMReverseResponse | undefined> {
    const params = {
      zoom,
      format,
      ...props,
    };
    const data = await this.instance
      .get("/reverse", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.warn("no data found during osm reverse", params, res);
          return undefined;
        }
        return res.data as OSMReverseResponse;
      })
      .catch((err) => {
        console.error(
          "error getting osm reverse data for input: ",
          params,
          err,
        );
        return undefined;
      });
    return data;
  }

  /**
   * look up a location from a textual description or address.
   * Nominatim supports structured and free-form search queries.
   * @see https://nominatim.org/release-docs/latest/api/Search/
   * @returns OSMReverseResponse corresponding to query
   */
  async search({
    format = "json",
    ...props
  }: {
    q: string;
    format?: string;
  }): Promise<OSMReverseResponse | undefined> {
    const params = {
      format,
      ...props,
    };
    const data = await this.instance
      .get("/search", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.warn("no data found during osm reverse", params, res);
          return undefined;
        }
        return res.data as OSMReverseResponse;
      })
      .catch((err) => {
        console.error("error getting osm search data for input: ", params, err);
        return undefined;
      });
    return data;
  }
}

export default new OSMService();
