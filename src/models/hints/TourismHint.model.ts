import { departements } from "../../constants/departements";
import tourismController from "../../controllers/tourism.controller";
import { Hint, HintProps } from "../primitives/Hint.model";
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
    ...props
  }: {
    endingDepartementCode: DepartementCode;
    methodGenerationMessage?: ToursimHintMethodGenerationMessage;
  } & HintProps) {
    super(props);
    this.methodGenerationMessage = methodGenerationMessage;
    this.message =
      this.methodGenerationMessage === "departement-rank"
        ? this._generateMessageFromDepRank(endingDepartementCode)
        : this._generateMessageFromMostPopularSeason(endingDepartementCode);
  }

  /**
   * Generate a message from the popularity by year of the ending departement
   * @param departementCode ending departement
   * @returns hint message
   */
  _generateMessageFromDepRank(departementCode: DepartementCode): string {
    const rank = tourismController.getPopularityRankByYearOf(departementCode);
    return `Votre département d'arrivée est le ${rank}e plus populaire de France (sur ${departements.length}) !`;
  }

  /**
   * Generate a message from most visited season of the ending departement
   * @param departementCode ending departement
   * @returns hint message
   */
  _generateMessageFromMostPopularSeason(
    departementCode: DepartementCode,
  ): string {
    const season = tourismController.getMostAttractiveSeasonOf(departementCode);
    return `C'est en ${season} que votre département d'arrivée est le plus visité !`;
  }

  toDto(): TourismHintDto {
    return {
      ...super.toDto(),
      type: "tourism-hint",
      message: this.message,
      methodGenerationMessage: this.methodGenerationMessage,
    };
  }
}
