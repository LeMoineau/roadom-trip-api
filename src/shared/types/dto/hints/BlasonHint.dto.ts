import { HintDto } from "./Hint.dto";

export interface BlasonHintDto extends HintDto {
  type: "departement-blason-hint";
  blasonURL: string;
}
