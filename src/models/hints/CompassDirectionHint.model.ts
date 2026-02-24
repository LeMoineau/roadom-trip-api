import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { Hint } from "../../shared/models/hints/Hint.model";
import { CompassDirectionHintDto } from "../../shared/types/dto/hints/CompassDirectionHint.dto";
import { GeoUtils } from "../../shared/utils/geo.utils";

export class CompassDirectionHint extends Hint {
  direction: number;

  constructor({
    endingPoint,
    startingPoint,
  }: {
    endingPoint: GeoPoint;
    startingPoint: GeoPoint;
  }) {
    super();
    this.direction = this._generateDirection(startingPoint, endingPoint);
  }

  _generateDirection(startingPoint: GeoPoint, endingPoint: GeoPoint): number {
    return GeoUtils.bearing(startingPoint, endingPoint);
  }

  toDto(): CompassDirectionHintDto {
    return {
      type: "compass-direction-hint",
      direction: this.direction,
      from: "north",
    };
  }
}
