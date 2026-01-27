import { GeoPointDto } from "../types/dto/geo/GeoPoint.dto";
import { TripDto } from "../types/dto/trip/Trip.dto";
import { UUID } from "../types/primitives/Identifier";
import { GeoPoint } from "./GeoPoint.model";
import { v4 as uuidv4 } from "uuid";

export class Trip {
  id: UUID;
  startingPos: GeoPoint;
  endingPos: GeoPoint;

  constructor({
    startingPos,
    endingPos,
    id = uuidv4(),
  }: {
    startingPos: GeoPointDto;
    endingPos: GeoPointDto;
    id?: UUID;
  }) {
    this.id = id;
    this.startingPos = new GeoPoint(startingPos);
    this.endingPos = new GeoPoint(endingPos);
  }

  toDto(): TripDto {
    return {
      id: this.id,
      startingPos: this.startingPos.toDto(),
      endingPos: this.endingPos.toDto(),
    };
  }
}
