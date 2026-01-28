export interface GeoPointDto {
  lat: number;
  lon: number;
  label?: string;
}

export function isGeoPointDto(pt: any): pt is GeoPointDto {
  return (
    !!pt &&
    pt.lat &&
    typeof pt.lat === "number" &&
    pt.lon &&
    typeof pt.lon === "number" &&
    (!pt.label || typeof pt.label === "string")
  );
}
