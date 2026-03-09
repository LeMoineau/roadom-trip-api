import { HintDto } from "./Hint.dto";

export type CompassDirectionHintMethod =
  | "from-starting-pt"
  | "from-opened-hint-pt";

export interface CompassDirectionHintDto extends HintDto {
  type: "compass-direction-hint";
  direction: number;
  from: "north" | "east" | "west" | "south";
  method: CompassDirectionHintMethod;
}
