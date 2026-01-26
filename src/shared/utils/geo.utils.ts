export namespace GeoUtils {
  /**
   * Get a distance in km and convert it into lat/lon degree
   * @returns [lat, lon] distance
   */
  export function convertKmToLatLon(
    distanceKm: number,
    lat: number,
  ): [number, number] {
    return [
      (1 / 110.574) * distanceKm,
      (1 / (111.32 * Math.cos(lat))) * distanceKm,
    ];
  }
}
