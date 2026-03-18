import { OpenWeatherFormattedResponse } from "../../open-weather/OpenWeather";
import { HintDto } from "./Hint.dto";

export interface WeatherHintDto extends HintDto {
  type: "weather-hint";
  weather: OpenWeatherFormattedResponse;
}
