import { Hint, HintProps } from "../primitives/Hint.model";
import { PreciseDescriptionHintDto } from "../../shared/types/dto/hints/PreciseDescriptionHint.dto";
import { WikipediaFormattedPage } from "../../shared/types/wikipedia/Wikipedia";

export class PreciseDescriptionHint extends Hint {
  wikipediaPage: WikipediaFormattedPage;

  constructor({
    wikipediaPage,
    ...props
  }: { wikipediaPage: WikipediaFormattedPage } & HintProps) {
    super(props);
    this.wikipediaPage = wikipediaPage;
  }

  toDto(): PreciseDescriptionHintDto {
    return {
      ...super.toDto(),
      type: "precise-description-hint",
      wikipediaPage: this.wikipediaPage,
    };
  }
}
