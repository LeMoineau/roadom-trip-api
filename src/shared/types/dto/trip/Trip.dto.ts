import { OSMResponse } from "../../osm/OSMResponse";
import { DateString } from "../../primitives/Date";
import { UUID } from "../../primitives/Identifier";
import { GeoPointDto, isGeoPointDto } from "../geo/GeoPoint.dto";
import { StepDto } from "./../Step.dto";

export interface TripDto {
  id: UUID;
  startingPos: GeoPointDto;
  endingPos: GeoPointDto;
  createdAt: DateString;
  steps: StepDto[];
  osmEndingDetails?: OSMResponse;
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
