import { GeoPoint, isGeoPoint } from "../geo/GeoPoint";

export interface CreatingTripRequest {
  startPos: GeoPoint;
  distanceTrip: number;
}

export function isCreatingTripRequest(req: any): req is CreatingTripRequest {
  return (
    !!req &&
    isGeoPoint(req.startPos) &&
    req.distanceTrip &&
    typeof req.distanceTrip === "number"
  );
}
