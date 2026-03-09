import { HintDto } from "./Hint.dto";

export interface StateHintDto extends HintDto {
  type: "state-hint";
  message: string;
}
