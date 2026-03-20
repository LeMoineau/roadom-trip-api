import { MathUtils } from "./math.utils";
import * as geolib from "geolib";
import seaGeoMap from "@geo-maps/earth-seas-10m";
import GeoJsonLookup from "geojson-geometries-lookup";
import { GeoPoint } from "../models/GeoPoint.model";

// Loading the sea map
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

  /**
   * Convert a degree lat/lon to radian
   * @param degrees
   * @returns
   */
  export function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert a degree lat/lon to radian
   * @param radians
   * @returns
   */
  export function toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Calculate the angle from north in degree between 2 points
   * @param startLat
   * @param startLng
   * @param destLat
   * @param destLng
   * @returns degree from north from starting point to destination point
   */
  export function bearing(startingPoint: GeoPoint, destinationPoint: GeoPoint) {
    const startLat = toRadians(startingPoint.lat);
    const startLng = toRadians(startingPoint.lon);
    const destLat = toRadians(destinationPoint.lat);
    const destLng = toRadians(destinationPoint.lon);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    const brng = Math.atan2(y, x);
    return (toDegrees(brng) + 360) % 360;
  }
}
