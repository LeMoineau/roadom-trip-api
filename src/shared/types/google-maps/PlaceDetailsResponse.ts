import { GoogleMapsPlace } from "./GoogleMapsPlace";

export interface PlaceDetailsResponse {
  html_attributions: string[];
  result: GoogleMapsPlace;
  status: PlaceDetailsResponseStatus;
  info_messages?: string[];
}

export type PlaceDetailsResponseStatus =
  | "OK"
  | "ZERO_RESULTS"
  | "NOT_FOUND"
  | "INVALID_REQUEST"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR";
