import { HintDto } from "./Hint.dto";

export interface DepartementHintDto extends HintDto {
  type: "departement-hint";
  message: string;
}
