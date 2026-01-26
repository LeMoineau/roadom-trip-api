import { CreatingTripRequest } from "../shared/types/trip/CreatingTripRequest";
import { Trip } from "../shared/types/trip/Trip";
import * as geolib from "geolib";

class TripFactory {
  async create(req: CreatingTripRequest): Promise<Trip> {
    console.log("creating trip", req);
    const res = geolib.getBoundsOfDistance(
      { lat: req.startPos.lat, lon: req.startPos.lon },
      req.distanceTrip * 1000,
    );
    const dis = geolib.getDistance(res[0], res[1]);

    /**
     * - on prend une lat / lon random entre ces 2 points
     * - tant que distance avec point de départ est > à distanceTrip on recommence
     * - tant que le point est dans la mer on recommence
     */

    console.log(res, dis);
    return {
      startPos: req.startPos,
      endingPos: req.startPos,
      indices: [],
    };
  }
}

export default new TripFactory();
