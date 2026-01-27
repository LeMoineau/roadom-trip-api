import { GeoPointDto, isGeoPointDto } from "../geo/GeoPoint.dto";

export interface CreatingTripRequest {
  startingPos: GeoPointDto;
  distanceMax: number;
  distanceMin?: number;
}

export function isCreatingTripRequest(req: any): req is CreatingTripRequest {
  return (
    !!req &&
    isGeoPointDto(req.startingPos) &&
    req.distanceMax &&
    typeof req.distanceMax === "number" &&
    (!req.distanceMin || typeof req.distanceMin === "number")
  );
}
