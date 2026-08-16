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

  get displayIcon(): string | undefined {
    if (this.label?.includes("Abandon")) return "🏳️";
    if (this.label?.includes("Fin")) return "🏁";
    if (this.label?.includes("Début")) return "🏠";
  }

  toDto(): GeoPointDto {
    return {
      lat: this.lat,
      lon: this.lon,
      label: this.label,
    };
  }
}
