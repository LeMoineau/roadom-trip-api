import { HintDto } from "./Hint.dto";

export interface NearCityHintDto extends HintDto {
  type: "near-city-hint";
  message: string;
  city: string;
}
