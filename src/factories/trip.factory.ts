import { GeoUtils } from "../shared/utils/geo.utils";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { CreatingTripRequest } from "../shared/types/dto/trip/CreatingTripRequest";
import { Trip } from "../models/primitives/Trip.model";
import stepsFactory from "./steps.factory";
import osmService from "../services/osm.service";
import { TripRoute } from "../shared/types/dto/trip/TripRoute";
import { GeoPointDto } from "../shared/types/dto/geo/GeoPoint.dto";
import osrmService from "../services/osrm.service";
import googleMapsService from "../services/google-maps.service";
import { randomUUID } from "crypto";

const DEFAULT_STARTING_POS_LABEL = "Point de départ";
const DEFAULT_ENDING_POS_LABEL = "Destination";
const MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS = 5;

class TripFactory {
  /**
   * Create a trip from a CreatingTripRequest
   *
   * By default, a startingPos label will be set to {DEFAULT_STARTING_POS_LABEL} and a endingPos
   * label to {DEFAULT_ENDING_POS_LABEL}.
   * @param req
   * @returns
   */
  async create(req: CreatingTripRequest): Promise<Trip> {
    const tripId = randomUUID();
    console.debug(`trip #${tripId}: begin generating...`);

    // Generate ending pos
    let endingPos;
    let osmEndingDetails;
    if (!!req.endingPos) {
      console.debug(`trip #${tripId}: getting ending pos from request...`);
      endingPos = new GeoPoint(req.endingPos);
      osmEndingDetails = await osmService.reverse({
        lat: endingPos.lat,
        lon: endingPos.lon,
      });
    } else {
      console.debug(`trip #${tripId}: generating ending pos...`);
      endingPos = this._getRandomPointInAllowedDistance(req);
      let attempts = 1;
      while (
        !!!osmEndingDetails &&
        attempts < MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS
      ) {
        while (GeoUtils.isInSea(endingPos)) {
          endingPos = this._getRandomPointInAllowedDistance(req);
        }
        osmEndingDetails = await osmService.reverse({
          lat: endingPos.lat,
          lon: endingPos.lon,
        });
        if (!!req.allowNoInformationsEnding) {
          break;
        }
        if (!!!osmEndingDetails?.address.village) {
          attempts++;
          osmEndingDetails = undefined;
          endingPos = this._getRandomPointInAllowedDistance(req);
        }
      }
      endingPos.label = DEFAULT_ENDING_POS_LABEL;
      console.debug(
        `trip #${tripId}: destination found after ${attempts} attempts`,
      );
    }

    // Generate trip instance
    const trip = new Trip({
      id: tripId,
      startingPos: { label: DEFAULT_STARTING_POS_LABEL, ...req.startingPos },
      endingPos: endingPos.toDto(),
      createdAt: new Date(),
      osmEndingDetails,
      route: await this._generateTripRoute(req.startingPos, endingPos),
    });

    // Generate trip steps
    trip.steps = await stepsFactory.create(trip);
    console.debug(`trip #${tripId}: generation done!`);
    return trip;
  }

  async _generateTripRoute(
    startingPos: GeoPointDto,
    endingPos: GeoPointDto,
  ): Promise<TripRoute | undefined> {
    const origin: [number, number] = [startingPos.lat, startingPos.lon];
    const destination: [number, number] = [endingPos.lat, endingPos.lon];
    const route = await osrmService.getRoute({
      origin,
      destination,
    });
    if (!!route) {
      return {
        source: "osrm",
        route,
      };
    }
    const mapsRoute = await googleMapsService.getRoute({
      origin,
      destination,
    });
    if (!!mapsRoute) {
      return {
        source: "google-maps",
        route: mapsRoute,
      };
    }
  }

  _getRandomPointInAllowedDistance(req: CreatingTripRequest): GeoPoint {
    if (!!!req.distanceMax) {
      throw new Error("distance max not defined");
    }

    const startingPos = new GeoPoint(req.startingPos);
    const bounds = GeoUtils.getBoundsOfDistance(startingPos, req.distanceMax);
    let endingPos = GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
    let distanceTrip = GeoUtils.getDistanceBetween(startingPos, endingPos);

    while (
      distanceTrip > req.distanceMax ||
      (req.distanceMin && distanceTrip < req.distanceMin)
    ) {
      endingPos = GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
      distanceTrip = GeoUtils.getDistanceBetween(startingPos, endingPos);
    }

    return endingPos;
  }
}

export default new TripFactory();
