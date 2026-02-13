import { Hint } from "../../shared/models/hints/Hint.model";
import { DepartementHintDto } from "../../shared/types/dto/hints/DepartementHint.dto";

export class DepartementHint extends Hint {
  message: string;

  constructor({ departementLibelle }: { departementLibelle: string }) {
    super();
    this.message = this._generateMessage(departementLibelle);
  }

  _generateMessage(departementLibelle: string): string {
    return `Le département de votre point d'arrivée est : ${departementLibelle} !`;
  }

  toDto(): DepartementHintDto {
    return {
      type: "departement-hint",
      message: this.message,
    };
  }
}
