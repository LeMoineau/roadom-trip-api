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
      startingPos: req.startPos,
      endingPos: endingPos.toDto(),
    });
  }

  _getRandomPointInAllowedDistance(req: CreatingTripRequest): GeoPoint {
    const startPos = new GeoPoint(req.startPos);
    const bounds = GeoUtils.getBoundsOfDistance(startPos, req.distanceMax);
    let endingPos = GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
    let distanceTrip = GeoUtils.getDistanceBetween(startPos, endingPos);

    while (
      distanceTrip > req.distanceMax ||
      (req.distanceMin && distanceTrip < req.distanceMin)
    ) {
      endingPos = GeoUtils.getRandomPointBetween(bounds[0], bounds[1]);
      distanceTrip = GeoUtils.getDistanceBetween(startPos, endingPos);
    }

    console.log("final distance: ", distanceTrip);
    return endingPos;
  }
}

export default new TripFactory();
