import { HintDto } from "./Hint.dto";

export type ToursimHintMethodGenerationMessage =
  | "departement-rank"
  | "most-popular-season";

export interface TourismHintDto extends HintDto {
  type: "tourism-hint";
  message: string;
  methodGenerationMessage: ToursimHintMethodGenerationMessage;
}
