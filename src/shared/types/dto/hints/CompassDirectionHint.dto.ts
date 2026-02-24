import { HintDto } from "./Hint.dto";

export interface CompassDirectionHintDto extends HintDto {
  type: "compass-direction-hint";
  direction: number;
  from: "north" | "east" | "west" | "south";
}
