import blasonsController from "../../controllers/blasons.controller";
import { Hint, HintProps } from "../primitives/Hint.model";
import { BlasonHintDto } from "../../shared/types/dto/hints/BlasonHint.dto";
import { DepartementCode } from "../../shared/types/geo/Departement";

const NOT_FOUND_BLASON_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Unknown_escutcheon-fr.svg/960px-Unknown_escutcheon-fr.svg.png";

export class BlasonHint extends Hint {
  blasonURL: string;

  constructor({
    departementCode,
    ...props
  }: { departementCode: DepartementCode } & HintProps) {
    super(props);
    this.blasonURL = this._generateBlasonURL(departementCode);
  }

  _generateBlasonURL(departementCode: DepartementCode): string {
    const blason = blasonsController.get({ departementCode });
    if (blason) return blason.blasonURL;
    console.warn(`blason not found for departement code ${departementCode}`);
    return NOT_FOUND_BLASON_URL;
  }

  toDto(): BlasonHintDto {
    return {
      ...super.toDto(),
      type: "departement-blason-hint",
      blasonURL: this.blasonURL,
    };
  }
}
