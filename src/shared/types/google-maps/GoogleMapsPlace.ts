export interface GoogleMapsPlace {
  address_components?: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  adr_address?: string;
  business_status?: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
  curbside_pickup?: boolean;
  opening_hours?: any;
  current_opening_hours?: any;
  delivery?: boolean;
  dine_in?: boolean;
  editorial_summary?: {};
  formatted_address?: string;
  formatted_phone_number?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  international_phone_number?: string;
  name?: string;
  permanently_closed?: boolean;
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id?: string;
  plus_code?: {
    global_code: string;
    compound_code?: string;
  };
  price_level?: 0 | 1 | 2 | 3 | 4;
  rating?: number;
  reservable?: boolean;
  reviews?: {
    author_name: string;
    rating: number;
    relative_time_description: string;
    time: number;
    author_url?: string;
    language?: string;
    original_language?: string;
    profile_photo_url?: string;
    text?: string;
    translated?: boolean;
  }[];
  serves_beer?: boolean;
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_dinner?: boolean;
  serves_lunch?: boolean;
  serves_vegetarian_food?: boolean;
  serves_wine?: boolean;
  takeout?: boolean;
  types?: string[];
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  vicinity?: string;
  website?: string;
  wheelchair_accessible_entrance?: boolean;
}
