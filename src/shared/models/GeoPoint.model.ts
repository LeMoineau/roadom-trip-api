import { GeoPointDto } from "../types/dto/geo/GeoPoint.dto";

export class GeoPoint {
  lat: number;
  lon: number;

  constructor(props: { lat: number; lon: number }) {
    this.lat = props.lat;
    this.lon = props.lon;
  }

  toDto(): GeoPointDto {
    return {
      lat: this.lat,
      lon: this.lon,
    };
  }
}
