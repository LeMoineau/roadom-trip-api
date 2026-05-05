import { DirectionsRoute } from "@googlemaps/google-maps-services-js";
import { Route } from "osrm";

export interface TripRoute {
  source: "google-maps" | "osrm";
  route: DirectionsRoute | Route;
}
