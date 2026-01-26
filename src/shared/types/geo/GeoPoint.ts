export interface GeoPoint {
  lat: number;
  lon: number;
}

export function isGeoPoint(pt: any): pt is GeoPoint {
  return (
    !!pt &&
    pt.lat &&
    typeof pt.lat === "number" &&
    pt.lon &&
    typeof pt.lon === "number"
  );
}
