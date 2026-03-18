import { GeoUtils } from "../shared/utils/geo.utils";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { CreatingTripRequest } from "../shared/types/dto/trip/CreatingTripRequest";
import { Trip } from "../shared/models/Trip.model";
import stepsFactory from "./steps.factory";
import osmService from "../services/osm.service";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_STARTING_POS_LABEL = "Point de départ";
const DEFAULT_ENDING_POS_LABEL = "Destination";
const MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS = 5;

class TripFactory {
  /**
   * Create a trip from a CreatingTripRequest
   *
   * By default, a startingPos label will be set to {DEFAULT_STARTING_POS_LABEL}
   * @param req
   * @returns
   */
  async create(req: CreatingTripRequest): Promise<Trip> {
    const tripId = uuidv4();
    console.debug(`trip #${tripId}: begin generating...`);

    // Generate ending pos
    let endingPos = this._getRandomPointInAllowedDistance(req);
    let osmDetails;
    let attempts = 0;
    while (!!!osmDetails && attempts < MAX_ENDING_POS_OSM_SEARCH_ATTEMPTS) {
      while (GeoUtils.isInSea(endingPos)) {
        endingPos = this._getRandomPointInAllowedDistance(req);
      }
      osmDetails = await osmService.reverse({
        lat: endingPos.lat,
        lon: endingPos.lon,
      });
      if (!!!req.allowNoInformationsEnding && !!!osmDetails?.address.village) {
        attempts++;
        osmDetails = undefined;
        endingPos = this._getRandomPointInAllowedDistance(req);
      }
    }
    endingPos.label = DEFAULT_ENDING_POS_LABEL;
    console.debug(
      `trip #${tripId}: destination found after ${attempts} attempts`,
    );

    // Generate trip instance
    const trip = new Trip({
      id: tripId,
      startingPos: { label: DEFAULT_STARTING_POS_LABEL, ...req.startingPos },
      endingPos: endingPos.toDto(),
      createdAt: new Date(),
      osmDetails,
    });

    // Generate trip steps
    trip.steps = await stepsFactory.create(trip);
    console.debug(`trip #${tripId}: generation done!`);
    return trip;
  }

  _getRandomPointInAllowedDistance(req: CreatingTripRequest): GeoPoint {
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

    console.log("final distance: ", distanceTrip);
    return endingPos;
  }
}

export default new TripFactory();
