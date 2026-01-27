import { UUID } from "../../primitives/Identifier";
import { GeoPointDto, isGeoPointDto } from "../geo/GeoPoint.dto";

export interface TripDto {
  id: UUID;
  startingPos: GeoPointDto;
  endingPos: GeoPointDto;
}

export function isTripDto(trip: any): trip is TripDto {
  return (
    !!trip &&
    isGeoPointDto(trip.startingPos) &&
    isGeoPointDto(trip.endingPos) &&
    !!trip.id &&
    typeof trip.id === "string"
  );
}
