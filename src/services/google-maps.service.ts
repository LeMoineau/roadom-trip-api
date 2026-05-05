import axios, { AxiosInstance } from "axios";
import { NearbySearchRequest } from "../shared/types/google-maps/NearbySearchRequest";
import { NearbySearchResponse } from "../shared/types/google-maps/NearbySearchResponse";
import config from "../config/config";
import { PlaceDetailsResponse } from "../shared/types/google-maps/PlaceDetailsResponse";
import {
  Client,
  DirectionsRoute,
  Language,
  TravelMode,
} from "@googlemaps/google-maps-services-js";
import { RouteRequest } from "../shared/types/google-maps/RouteRequest";

//TODO: refactor with @googlemaps client methods & types

/**
 * Google Maps API (mostly Place API)
 * @see https://developers.google.com/maps/documentation/places/web-service/legacy/overview-legacy?hl=fr
 */
class GoogleMapsService {
  baseURL: string;
  apiKey: string;
  instance: AxiosInstance;
  client;

  constructor() {
    this.baseURL = config.getEnv().googleMapsApiURL;
    this.apiKey = config.getEnv().googleMapsApiKey;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
    this.client = new Client({ axiosInstance: this.instance });
  }

  /**
   * Search for places near a location (lat/lon)
   * @see https://developers.google.com/maps/documentation/places/web-service/legacy/search-nearby?hl=fr
   * @param request NearbySearchRequest
   * @returns NearbySearchResponse or undefined if error during axios request
   */
  async nearbySearch(
    request: NearbySearchRequest,
  ): Promise<NearbySearchResponse | undefined> {
    const params = {
      ...request,
      location: request.location.join(","),
    };
    return await this.instance
      .get("/place/nearbysearch/json", {
        params: {
          ...params,
          key: this.apiKey,
        },
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "error getting nearby search data for input: ",
            params,
            res.data,
          );
          return;
        }
        return res.data as NearbySearchResponse;
      })
      .catch((err) => {
        console.error(
          "error getting google-maps nearbysearch data for input: ",
          params,
          err,
        );
        return undefined;
      });
  }

  /**
   * Get details of a place by its identifier
   * @see https://developers.google.com/maps/documentation/places/web-service/legacy/details?hl=fr
   * @param place_id target place id
   * @returns PlaceDetailsResponse or undefined if error during axios request
   */
  async placeDetails({
    placeId,
  }: {
    placeId: string;
  }): Promise<PlaceDetailsResponse | undefined> {
    const params = {
      place_id: placeId,
    };
    return await this.instance
      .get("/place/details/json", {
        params: {
          ...params,
          key: this.apiKey,
        },
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "error getting nearby search data for input: ",
            params,
            res.data,
          );
          return;
        }
        return res.data as PlaceDetailsResponse;
      })
      .catch((err) => {
        console.error(
          "error getting google-maps place details data for input: ",
          params,
          err,
        );
        return undefined;
      });
  }

  /**
   * Get google maps url from place identifier
   * @param placeId target place id
   * @returns google maps url of the place
   */
  getUrlFromPlaceId(placeId: string): string {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  }

  async getRoute({
    ...params
  }: RouteRequest): Promise<DirectionsRoute | undefined> {
    try {
      const response = await this.client.directions({
        params: {
          ...params,
          mode: TravelMode.driving, // Modes possibles : 'driving', 'walking', 'bicycling', 'transit'
          language: Language.fr,
          key: this.apiKey,
        },
        timeout: 1000, // Optionnel
      });

      if (response.data.status === "OK") {
        // Le premier itinéraire [0] est l'itinéraire conseillé
        const route = response.data.routes[0];

        console.log(`Itinéraire : ${route.summary}`);
        console.log(`Distance : ${route.legs[0].distance.text}`);
        console.log(`Durée estimée : ${route.legs[0].duration.text}`);

        // Affichage des étapes (instructions)
        route.legs[0].steps.forEach((step, index) => {
          console.log(
            `${index + 1}. ${step.html_instructions.replace(/<[^>]*>?/gm, "")}`,
          );
        });
        return route;
      } else {
        console.error("Erreur API : " + response.data.status);
      }
    } catch (err: any) {
      console.error("Erreur de connexion : ", err.message);
    }
  }
}

export default new GoogleMapsService();
