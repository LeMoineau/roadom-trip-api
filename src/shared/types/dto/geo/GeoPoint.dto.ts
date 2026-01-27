export interface GeoPointDto {
  lat: number;
  lon: number;
}

export function isGeoPointDto(pt: any): pt is GeoPointDto {
  return (
    !!pt &&
    pt.lat &&
    typeof pt.lat === "number" &&
    pt.lon &&
    typeof pt.lon === "number"
  );
}
