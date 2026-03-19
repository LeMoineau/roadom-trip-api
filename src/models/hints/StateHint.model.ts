import { Hint, HintProps } from "../primitives/Hint.model";
import { StateHintDto } from "../../shared/types/dto/hints/StateHint.dto";

export class StateHint extends Hint {
  message: string;

  constructor({
    stateLibelle,
    ...props
  }: { stateLibelle: string } & HintProps) {
    super(props);
    this.message = this._generateMessage(stateLibelle);
  }

  _generateMessage(stateLibelle: string): string {
    return `La région de votre destination est : ${stateLibelle} !`;
  }

  toDto(): StateHintDto {
    return {
      ...super.toDto(),
      type: "state-hint",
      message: this.message,
    };
  }
}
