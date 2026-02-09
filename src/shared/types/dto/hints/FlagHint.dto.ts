import { HintDto } from "./Hint.dto";

export interface FlagHintDto extends HintDto {
  type: "departement-flag-hint";
  flagURL: string;
  thumbURL: string;
}
