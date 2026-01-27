import { UUID } from "../../primitives/Identifier";
import { GeoPointDto } from "../geo/GeoPoint.dto";

export interface TripDto {
  id: UUID;
  startingPos: GeoPointDto;
  endingPos: GeoPointDto;
}
