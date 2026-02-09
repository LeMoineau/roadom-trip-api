import flagService from "../../services/flag.service";
import { Hint } from "../../shared/models/hints/Hint.model";
import { FlagHintDto } from "../../shared/types/dto/hints/FlagHint.dto";
import { DepartementCode } from "../../shared/types/geo/Departement";

const NOT_FOUND_FLAG_URL =
  "https://www.svgrepo.com/show/398539/unknown-flag.svg";

export class FlagHint extends Hint {
  flagURL: string;
  thumbURL: string;

  constructor({ departementCode }: { departementCode: DepartementCode }) {
    super();
    const { flagURL, thumbURL } = this._generateFlagUrls(departementCode);
    this.flagURL = flagURL;
    this.thumbURL = thumbURL;
  }

  _generateFlagUrls(departementCode: DepartementCode): {
    flagURL: string;
    thumbURL: string;
  } {
    const res = flagService.get({ departementCode });
    if (res) return res;
    console.warn(`flag not found for departement code ${departementCode}`);
    return {
      flagURL: NOT_FOUND_FLAG_URL,
      thumbURL: NOT_FOUND_FLAG_URL,
    };
  }

  toDto(): FlagHintDto {
    return {
      type: "departement-flag-hint",
      flagURL: this.flagURL,
      thumbURL: this.thumbURL,
    };
  }
}
