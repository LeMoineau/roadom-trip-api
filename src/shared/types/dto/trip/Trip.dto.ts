import { DateString } from "../../primitives/Date";
import { UUID } from "../../primitives/Identifier";
import { GeoPointDto, isGeoPointDto } from "../geo/GeoPoint.dto";

export interface TripDto {
  id: UUID;
  startingPos: GeoPointDto;
  endingPos: GeoPointDto;
  createdAt: DateString;
}

export function isTripDto(trip: any): trip is TripDto {
  return (
    !!trip &&
    isGeoPointDto(trip.startingPos) &&
    isGeoPointDto(trip.endingPos) &&
    !!trip.id &&
    typeof trip.id === "string" &&
    !!trip.createdAt &&
    typeof trip.createdAt === "string"
  );
}
