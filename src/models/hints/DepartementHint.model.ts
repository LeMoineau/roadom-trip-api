import { Hint, HintProps } from "../primitives/Hint.model";
import { DepartementHintDto } from "../../shared/types/dto/hints/DepartementHint.dto";

export class DepartementHint extends Hint {
  message: string;

  constructor({
    departementLibelle,
    ...props
  }: { departementLibelle: string } & HintProps) {
    super(props);
    this.message = this._generateMessage(departementLibelle);
  }

  _generateMessage(departementLibelle: string): string {
    return `Le département de votre point d'arrivée est : ${departementLibelle} !`;
  }

  toDto(): DepartementHintDto {
    return {
      ...super.toDto(),
      type: "departement-hint",
      message: this.message,
    };
  }
}
