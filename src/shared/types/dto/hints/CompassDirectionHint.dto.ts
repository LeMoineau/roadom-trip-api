import { HintDto } from "./Hint.dto";

export interface CompassDirectionHintDto extends HintDto {
  type: "compass-direction-hint";
  message: string;
  direction: number;
}
