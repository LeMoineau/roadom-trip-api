import departementsController from "../../controllers/departements.controller";
import { Hint } from "../../shared/models/hints/Hint.model";
import {
  TourismHintDto,
  ToursimHintMethodGenerationMessage,
} from "../../shared/types/dto/hints/TourismHint.dto";
import { DepartementCode } from "../../shared/types/geo/Departement";
import { MathUtils } from "../../shared/utils/math.utils";

export class TourismHint extends Hint {
  message: string;
  methodGenerationMessage: ToursimHintMethodGenerationMessage;

  constructor({
    endingDepartementCode,
    methodGenerationMessage = MathUtils.getRandomFloat(100) > 50
      ? "departement-rank"
      : "most-popular-season",
  }: {
    endingDepartementCode: DepartementCode;
    methodGenerationMessage?: ToursimHintMethodGenerationMessage;
  }) {
    super();
    this.methodGenerationMessage = methodGenerationMessage;
    this.message =
      this.methodGenerationMessage === "departement-rank"
        ? this._generateMessageFromDepRank(endingDepartementCode)
        : this._generateMessageFromMostPopularSeason(endingDepartementCode);
  }

  _generateMessageFromDepRank(departementCode: DepartementCode): string {}

  _generateMessageFromMostPopularSeason(
    departementCode: DepartementCode,
  ): string {}

  toDto(): TourismHintDto {
    return {
      type: "tourism-hint",
      message: this.message,
      methodGenerationMessage: this.methodGenerationMessage,
    };
  }
}
