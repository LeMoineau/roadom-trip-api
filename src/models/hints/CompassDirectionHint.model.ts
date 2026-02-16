import { Hint } from "../../shared/models/hints/Hint.model";
import { CompassDirectionHintDto } from "../../shared/types/dto/hints/CompassDirectionHint.dto";

export class CompassDirectionHint extends Hint {
  toDto(): CompassDirectionHintDto {
    return {
      type: "compass-direction-hint",
      direction: 0,
      message: "",
    };
  }
}
