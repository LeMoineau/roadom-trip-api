import { GeoPointDto } from "../types/dto/geo/GeoPoint.dto";
import { TripDto } from "../types/dto/trip/Trip.dto";
import { UUID } from "../types/primitives/Identifier";
import { GeoPoint } from "./GeoPoint.model";
import { v4 as uuidv4 } from "uuid";

let TRIP_ID_SEQ = 1;

export class Trip {
  id: UUID;
  startingPos: GeoPoint;
  endingPos: GeoPoint;
  createdAt: Date;

  constructor({
    startingPos,
    endingPos,
    id = `${TRIP_ID_SEQ++}`, //uuidv4()
    createdAt = new Date(),
  }: {
    startingPos: GeoPointDto;
    endingPos: GeoPointDto;
    id?: UUID;
    createdAt?: Date | string;
  }) {
    this.id = id;
    this.startingPos = new GeoPoint(startingPos);
    this.endingPos = new GeoPoint(endingPos);
    if (typeof createdAt === "string") {
      try {
        this.createdAt = new Date(createdAt);
      } catch (err) {
        this.createdAt = new Date();
      }
    } else {
      this.createdAt = createdAt;
    }
  }

  toDto(): TripDto {
    return {
      id: this.id,
      startingPos: this.startingPos.toDto(),
      endingPos: this.endingPos.toDto(),
      createdAt: this.createdAt.toString(),
    };
  }
}
