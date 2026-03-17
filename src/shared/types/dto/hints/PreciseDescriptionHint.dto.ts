import { WikipediaFormattedPage } from "../../wikipedia/Wikipedia";
import { HintDto } from "./Hint.dto";

export interface PreciseDescriptionHintDto extends HintDto {
  type: "precise-description-hint";
  wikipediaPage: WikipediaFormattedPage;
}
