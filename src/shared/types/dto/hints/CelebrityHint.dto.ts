import { HintDto } from "./Hint.dto";
import { Celebrity } from "./../../metier/Celebrity";

export interface CelebrityHintDto extends HintDto {
  type: "celebrity-hint";
  celebrity: Celebrity;
  nearestFromPlace: "birth" | "death";
}
