import { Hint, HintProps } from "../primitives/Hint.model";
import { RebusHintDto } from "../../shared/types/dto/hints/RebusHint.dto";
import { WikipediaFormattedPage } from "../../shared/types/wikipedia/Wikipedia";

const DEFAULT_MESSAGE = "déso pas d'information a faire croquer";

export class RebusHint extends Hint {
  message: string = DEFAULT_MESSAGE;
  wikipediaPage: WikipediaFormattedPage;

  constructor({
    wikipediaPage,
    ...props
  }: { wikipediaPage: WikipediaFormattedPage } & HintProps) {
    super(props);
    this.wikipediaPage = wikipediaPage;
  }

  async generateRebus() {
    this.message = await this._generateMessage(this.wikipediaPage);
  }

  async _generateMessage(
    wikipediaPage: WikipediaFormattedPage,
  ): Promise<string> {
    const { toRebus } = await import("rebus-fr");
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
