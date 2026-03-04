import { HintDto } from "./Hint.dto";
import { Shoes } from "./../../metier/Shoes";

export interface ShoesHintDto extends HintDto {
  type: "shoes-hint";
  shoes: Shoes;
}
