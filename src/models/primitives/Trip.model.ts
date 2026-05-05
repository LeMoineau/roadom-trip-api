import { GeoPointDto } from "../../shared/types/dto/geo/GeoPoint.dto";
import { TripDto } from "../../shared/types/dto/trip/Trip.dto";
import { UUID } from "../../shared/types/primitives/Identifier";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { v4 as uuidv4 } from "uuid";
import { Step } from "./Step.model";
import { OSMResponse } from "../../shared/types/osm/OSMResponse";
import { TripStatus } from "../../shared/types/dto/trip/TripStatus";
import { TripRoute } from "../../shared/types/dto/trip/TripRoute";

export class Trip {
  id: UUID;
  startingPos: GeoPoint;
  endingPos: GeoPoint;
  createdAt: Date;
  steps: Step[];
  osmEndingDetails?: OSMResponse;
  status: TripStatus;
  personAskingAvailable?: number;
  route?: TripRoute;

  constructor({
    startingPos,
    endingPos,
    id = uuidv4(),
    createdAt = new Date(),
    steps = [],
    osmEndingDetails,
    status = "new",
    personAskingAvailable,
    route,
  }: {
    startingPos: GeoPointDto;
    endingPos: GeoPointDto;
    id?: UUID;
    createdAt?: Date | string;
    steps?: Step[];
    osmEndingDetails?: OSMResponse;
    status?: TripStatus;
    personAskingAvailable?: number;
    route?: TripRoute;
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
    this.status = status;
    this.personAskingAvailable = personAskingAvailable;
    this.route = route;
  }

  toDto(): TripDto {
    return {
      id: this.id,
      startingPos: this.startingPos.toDto(),
      endingPos: this.endingPos.toDto(),
      createdAt: this.createdAt.toString(),
      steps: this.steps.map((s) => s.toDto()),
      osmEndingDetails: this.osmEndingDetails,
      status: this.status,
      personAskingAvailable: this.personAskingAvailable,
      route: this.route,
    };
  }
}
