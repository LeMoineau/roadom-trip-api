import { HintDto } from "./Hint.dto";

export interface CityPopulationHintDto extends HintDto {
  type: "city-population-hint";
  population: string;
  message: string;
}
