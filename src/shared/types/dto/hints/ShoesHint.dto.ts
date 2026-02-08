import { HintDto } from "./Hint.dto";

export interface ShoesHintDto extends HintDto {
  type: "shoes-hint";
  shoes: string;
}
