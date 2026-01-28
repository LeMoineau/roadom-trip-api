import { GeoPointDto } from "../types/dto/geo/GeoPoint.dto";

export class GeoPoint {
  label?: string;
  lat: number;
  lon: number;

  constructor(props: { lat: number; lon: number; label?: string }) {
    this.lat = props.lat;
    this.lon = props.lon;
    this.label = props.label;
  }

  toDto(): GeoPointDto {
    return {
      lat: this.lat,
      lon: this.lon,
      label: this.label,
    };
  }
}
