import { Hint, HintProps } from "../primitives/Hint.model";
import { RebusHintDto } from "../../shared/types/dto/hints/RebusHint.dto";
import { toRebus } from "rebus-fr";
import { WikipediaFormattedPage } from "../../shared/types/wikipedia/Wikipedia";

const DEFAULT_MESSAGE = "déso pas d'information a faire croquer";

export class RebusHint extends Hint {
  message: string;

  constructor({
    wikipediaPage,
    ...props
  }: { wikipediaPage: WikipediaFormattedPage } & HintProps) {
    super(props);
    this.message = this._generateMessage(wikipediaPage);
  }

  _generateMessage(wikipediaPage: WikipediaFormattedPage): string {
    if (wikipediaPage.length <= 0) {
      console.warn(
        `wikipedia page ${JSON.stringify(wikipediaPage)} without sections so no rebus message`,
      );
      return toRebus(DEFAULT_MESSAGE);
    }
    for (let section of wikipediaPage) {
      if (section.title !== "Introduction" && section.paragraphes.length > 0) {
        return toRebus(section.paragraphes[0]);
      }
    }
    return toRebus(wikipediaPage[0].paragraphes[0]);
  }

  toDto(): RebusHintDto {
    return {
      ...super.toDto(),
      type: "rebus-hint",
      message: this.message,
    };
  }
}
