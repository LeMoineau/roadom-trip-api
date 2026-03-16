import { HintDto } from "./Hint.dto";

export interface RebusHintDto extends HintDto {
  type: "rebus-hint";
  message: string;
}
