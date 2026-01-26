import { GeoPoint } from "../geo/GeoPoint";

export interface Trip {
  startPos: GeoPoint;
  endingPos: GeoPoint;
  indices: string[];
}
