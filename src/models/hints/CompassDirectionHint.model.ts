import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { Hint, HintProps } from "../../shared/models/Hint.model";
import { CompassDirectionHintDto } from "../../shared/types/dto/hints/CompassDirectionHint.dto";
import { GeoUtils } from "../../shared/utils/geo.utils";

export class CompassDirectionHint extends Hint {
  direction: number;

  constructor({
    endingPoint,
    startingPoint,
    ...props
  }: {
    endingPoint: GeoPoint;
    startingPoint: GeoPoint;
  } & HintProps) {
    super(props);
    this.direction = this._generateDirection(startingPoint, endingPoint);
  }

  _generateDirection(startingPoint: GeoPoint, endingPoint: GeoPoint): number {
    return GeoUtils.bearing(startingPoint, endingPoint);
  }

  toDto(): CompassDirectionHintDto {
    return {
      ...super.toDto(),
      type: "compass-direction-hint",
      direction: this.direction,
      from: "north",
    };
  }
}
