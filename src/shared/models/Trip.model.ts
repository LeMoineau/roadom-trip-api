import { GeoPointDto } from "../types/dto/geo/GeoPoint.dto";
import { TripDto } from "../types/dto/trip/Trip.dto";
import { UUID } from "../types/primitives/Identifier";
import { GeoPoint } from "./GeoPoint.model";
import { v4 as uuidv4 } from "uuid";
import { Step } from "./Step.model";
import { OSMResponse } from "../types/osm/OSMResponse";

export class Trip {
  id: UUID;
  startingPos: GeoPoint;
  endingPos: GeoPoint;
  createdAt: Date;
  steps: Step[];
  osmEndingDetails?: OSMResponse;

  constructor({
    startingPos,
    endingPos,
    id = uuidv4(),
    createdAt = new Date(),
    steps = [],
    osmEndingDetails,
  }: {
    startingPos: GeoPointDto;
    endingPos: GeoPointDto;
    id?: UUID;
    createdAt?: Date | string;
    steps?: Step[];
    osmEndingDetails?: OSMResponse;
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
    this.steps = steps;
    this.osmEndingDetails = osmEndingDetails;
  }

  toDto(): TripDto {
    return {
      id: this.id,
      startingPos: this.startingPos.toDto(),
      endingPos: this.endingPos.toDto(),
      createdAt: this.createdAt.toString(),
      steps: this.steps.map((s) => s.toDto()),
      osmEndingDetails: this.osmEndingDetails,
    };
  }
}
