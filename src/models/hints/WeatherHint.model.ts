import { Hint, HintProps } from "../primitives/Hint.model";
import { WeatherHintDto } from "../../shared/types/dto/hints/WeatherHint.dto";
import { OpenWeatherFormattedResponse } from "../../shared/types/open-weather/OpenWeather";

export class CityPopulationHint extends Hint {
  weather: OpenWeatherFormattedResponse;

  constructor({
    openWeatherResponse,
    ...props
  }: { openWeatherResponse: OpenWeatherFormattedResponse } & HintProps) {
    super(props);
    this.weather = openWeatherResponse;
  }

  toDto(): WeatherHintDto {
    return {
      ...super.toDto(),
      type: "weather-hint",
      weather: this.weather,
    };
  }
}
