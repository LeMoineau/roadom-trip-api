export interface NearbySearchRequest {
  keyword: string;
  location: [number, number];
  radius: number;
  type?: string;
}
