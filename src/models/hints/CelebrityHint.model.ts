import celebritiesController from "../../controllers/celebrities.controller";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { Hint, HintProps } from "../primitives/Hint.model";
import { CelebrityHintDto } from "../../shared/types/dto/hints/CelebrityHint.dto";
import { Celebrity } from "../../shared/types/metier/Celebrity";
import { MathUtils } from "../../shared/utils/math.utils";

export type CelebrityHintNearestFromPlace = "birth" | "death";

export class CelebrityHint extends Hint {
  nearestFromPlace: CelebrityHintNearestFromPlace;
  celebrity: Celebrity;

  constructor({
    endingPoint,
    nearestFromPlace,
    ...props
  }: {
    endingPoint: GeoPoint;
    nearestFromPlace?: CelebrityHintNearestFromPlace;
  } & HintProps) {
    super(props);
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

  getOppositeMethod(): CelebrityHintNearestFromPlace {
    if (this.nearestFromPlace === "birth") return "death";
    return "birth";
  }

  toDto(): CelebrityHintDto {
    return {
      ...super.toDto(),
      type: "celebrity-hint",
      celebrity: this.celebrity,
      nearestFromPlace: this.nearestFromPlace,
    };
  }
}
