import { Hint, HintProps } from "../../shared/models/Hint.model";
import { RebusHintDto } from "../../shared/types/dto/hints/RebusHint.dto";
import { toRebus } from "rebus-fr";

export class RebusHint extends Hint {
  message: string;

  constructor({ description, ...props }: { description: string } & HintProps) {
    super(props);
    this.message = this._generateMessage(description);
  }

  _generateMessage(description: string): string {
    return toRebus(description);
  }

  toDto(): RebusHintDto {
    return {
      ...super.toDto(),
      type: "rebus-hint",
      message: this.message,
    };
  }
}
