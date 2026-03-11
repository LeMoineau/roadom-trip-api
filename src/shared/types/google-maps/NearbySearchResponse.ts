import { GoogleMapsPlace } from "./GoogleMapsPlace";

export interface NearbySearchResponse {
  html_attributions: string[];
  next_page_token: string;
  results: GoogleMapsPlace[];
  status: NearbySearchResponseStatus;
  error_message?: string;
  info_messages?: string;
}

export type NearbySearchResponseStatus =
  | "OK"
  | "ZERO_RESULTS"
  | "INVALID_REQUEST"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR";
