import { Hint, HintProps } from "../../shared/models/Hint.model";
import { PreciseDescriptionHintDto } from "../../shared/types/dto/hints/PreciseDescriptionHint.dto";

export class PreciseDescriptionHint extends Hint {
  description: string;

  constructor({ description, ...props }: { description: string } & HintProps) {
    super(props);
    this.description = description;
  }

  toDto(): PreciseDescriptionHintDto {
    return {
      ...super.toDto(),
      type: "precise-description-hint",
      description: this.description,
    };
  }
}
