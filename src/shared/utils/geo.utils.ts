import { GeoPoint } from "../models/GeoPoint.model";
import { MathUtils } from "./math.utils";
import * as geolib from "geolib";

// Loading the sea map
const seaGeoMap = require("@geo-maps/earth-seas-10m")();
const GeoJsonLookup = require("geojson-geometries-lookup");
const seaMap = new GeoJsonLookup(seaGeoMap);

export namespace GeoUtils {
  /**
   * Get rectangle extrems N-E & S-O of distance {distance} km
   * @param pt1 center of rect
   * @param distance distance around point in km
   */
  export function getBoundsOfDistance(
    pt1: GeoPoint,
    distance: number,
  ): [GeoPoint, GeoPoint] {
    const bounds = geolib.getBoundsOfDistance(pt1, distance * 1000);
    return [
      new GeoPoint({ lat: bounds[0].latitude, lon: bounds[0].longitude }),
      new GeoPoint({ lat: bounds[1].latitude, lon: bounds[1].longitude }),
    ];
  }

  /**
   * Get a random geopoint between two points
   * @param pt1
   * @param pt2
   * @returns
   */
  export function getRandomPointBetween(
    pt1: GeoPoint,
    pt2: GeoPoint,
  ): GeoPoint {
    return new GeoPoint({
      lat: MathUtils.getRandomFloat(
        Math.max(pt1.lat, pt2.lat),
        Math.min(pt1.lat, pt1.lat),
      ),
      lon: MathUtils.getRandomFloat(
        Math.max(pt1.lon, pt2.lon),
        Math.min(pt1.lon, pt1.lon),
      ),
    });
  }

  /**
   * Get distance between 2 points in km
   * @param pt1
   * @param pt2
   * @returns distance between the 2 points in km
   */
  export function getDistanceBetween(pt1: GeoPoint, pt2: GeoPoint): number {
    return geolib.getDistance(pt1, pt2) / 1000;
  }

  /**
   * Check if the given point is in the sea or not.
   * @param {GeoPoint} pt point to check
   * @return {boolean} True if the point is in the sea, false otherwise.
   */
  export function isInSea(pt: GeoPoint): boolean {
    return seaMap.hasContainers({
      type: "Point",
      coordinates: [pt.lon, pt.lat],
    });
  }
}
