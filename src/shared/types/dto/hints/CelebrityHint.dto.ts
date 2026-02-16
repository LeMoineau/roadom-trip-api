import { Celebrity } from "../../celebrities/Celebrity";
import { HintDto } from "./Hint.dto";

export interface CelebrityHintDto extends HintDto {
  type: "celebrity-hint";
  celebrity: Celebrity;
  nearestFromPlace: "birth" | "death";
}
