declare module "@geo-maps/earth-seas-10m" {}

declare module "geojson-geometries-lookup" {
  export default class GeoJsonGeometriesLookup {
    constructor(geojson: any);
    hasContainers(props: any): boolean;
  }
}
