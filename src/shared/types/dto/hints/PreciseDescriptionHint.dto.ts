import { HintDto } from "./Hint.dto";

export interface PreciseDescriptionHintDto extends HintDto {
  type: "precise-description-hint";
  description: string;
}
