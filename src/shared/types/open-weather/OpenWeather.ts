export interface OpenWeatherCurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
}

export interface OpenWeatherCurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}

export interface OpenWeatherFormattedCurrentWeather extends OpenWeatherCurrentWeather {
  weatherIcon: string;
  weatherLibelle: string;
}

export interface OpenWeatherFormattedResponse {
  units: OpenWeatherCurrentWeatherUnits;
  values: OpenWeatherFormattedCurrentWeather;
}

export interface OpenWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: OpenWeatherCurrentWeatherUnits;
  current_weather: OpenWeatherCurrentWeather;
}
