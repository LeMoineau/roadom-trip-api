import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import {
  OpenWeatherFormattedResponse,
  OpenWeatherResponse,
} from "../shared/types/open-weather/OpenWeather";
import wmoCodeService from "./wmo-code.service";

class OpenWeatherService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().openWeatherApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  async getForecast({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }): Promise<OpenWeatherFormattedResponse | undefined> {
    const params = {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      timezone: "Europe/Paris",
    };
    const data = await this.instance
      .get("/forecast", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "error getting forecast data for input: ",
            params,
            res.data,
          );
          return;
        }
        return res.data as OpenWeatherResponse;
      });
    if (!!!data) return;
    const wmoCode = data.current_weather.weathercode;
    return {
      units: data.current_weather_units,
      values: {
        ...data.current_weather,
        weatherIcon: wmoCodeService.getIcon(wmoCode),
        weatherLibelle: wmoCodeService.getLibelle(wmoCode),
      },
    };
  }
}

export default new OpenWeatherService();
