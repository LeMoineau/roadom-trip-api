import { GeoPointDto, isGeoPointDto } from "../geo/GeoPoint.dto";

export interface CreatingTripRequest {
  startPos: GeoPointDto;
  distanceMax: number;
  distanceMin?: number;
}

export function isCreatingTripRequest(req: any): req is CreatingTripRequest {
  return (
    !!req &&
    isGeoPointDto(req.startPos) &&
    req.distanceMax &&
    typeof req.distanceMax === "number" &&
    (!req.distanceMin || typeof req.distanceMin === "number")
  );
}
