import celebritiesController from "../../controllers/celebrities.controller";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { Hint } from "../../shared/models/hints/Hint.model";
import { Celebrity } from "../../shared/types/celebrities/Celebrity";
import { CelebrityHintDto } from "../../shared/types/dto/hints/CelebrityHint.dto";
import { MathUtils } from "../../shared/utils/math.utils";

export class CelebrityHint extends Hint {
  nearestFromPlace: "birth" | "death";
  celebrity: Celebrity;

  constructor({
    endingPoint,
    nearestFromPlace,
  }: {
    endingPoint: GeoPoint;
    nearestFromPlace?: "birth" | "death";
  }) {
    super();
    this.nearestFromPlace =
      nearestFromPlace ??
      (MathUtils.getRandomFloat(100) > 50 ? "birth" : "death");
    this.celebrity = this._generateCelebrity(endingPoint);
  }

  _generateCelebrity(endingPoint: GeoPoint): Celebrity {
    if (this.nearestFromPlace === "birth") {
      return celebritiesController.getNearestBirthPlaceOfCelebrityFrom(
        endingPoint,
      );
    }
    return celebritiesController.getNearestDeathPlaceOfCelebrityFrom(
      endingPoint,
    );
  }

  toDto(): CelebrityHintDto {
    return {
      type: "celebrity-hint",
      celebrity: this.celebrity,
      nearestFromPlace: this.nearestFromPlace,
    };
  }
}
