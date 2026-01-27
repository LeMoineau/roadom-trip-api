import { GeoUtils } from "../shared/utils/geo.utils";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { CreatingTripRequest } from "../shared/types/dto/trip/CreatingTripRequest";
import { Trip } from "../shared/models/Trip.model";

class TripFactory {
  async create(req: CreatingTripRequest): Promise<Trip> {
    console.log("trip request: ", req);

    // Get ending pos
    let endingPos = this._getRandomPointInAllowedDistance(req);
    while (GeoUtils.isInSea(endingPos)) {
      endingPos = this._getRandomPointInAllowedDistance(req);
    }

    console.log("ending pos:", endingPos);
    console.log("is in sea: ", GeoUtils.isInSea(endingPos));

    return new Trip({
      startingPos: req.startingPos,
      endingPos: endingPos.toDto(),
    });
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
