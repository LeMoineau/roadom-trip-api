import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { OSRMRouteRequest } from "../shared/types/osrm/OSRMRouteRequest";
import { Route } from "osrm";

class OSRMService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().osrmApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  async getRoute({
    origin,
    destination,
  }: OSRMRouteRequest): Promise<Route | undefined> {
    try {
      const response = await this.instance.get(
        `/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}`,
        { params: { overview: "false", geometries: "geojson", steps: "true" } },
      );
      const data = response.data;

      if (data.code === "Ok") {
        const route = data.routes[0] as Route;
        console.log(`Distance: ${route.distance / 1000} km`);
        console.log(`Temps: ${Math.round(route.duration / 60)} min`);
        return route;
      }
    } catch (error: any) {
      console.error("Erreur lors de la requête OSRM:", error.message);
    }
  }
}

export default new OSRMService();
