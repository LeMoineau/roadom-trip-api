import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { Hint, HintProps } from "../primitives/Hint.model";
import {
  CompassDirectionHintDto,
  CompassDirectionHintMethod,
} from "../../shared/types/dto/hints/CompassDirectionHint.dto";
import { GeoUtils } from "../../shared/utils/geo.utils";
import { MathUtils } from "../../shared/utils/math.utils";

/**
 * Indice qui donne la direction précise (degrée par rapport au nord) entre le point d'arrivée
 * et soit - le point de départ - le point à l'ouverture de l'indice.
 *
 * Dans le DTO de cette indice, on stocke dans tous les cas l'information de la direction précise
 * entre le point de départ et le point d'arrivée au cas où on serait dans la méthode via point
 * à l'ouverture de l'indice et qu'il y aurait un problème à ce moment là (récupération de la position
 * ou autre)
 */
export class CompassDirectionHint extends Hint {
  direction: number;
  method: CompassDirectionHintMethod;

  constructor({
    endingPoint,
    startingPoint,
    method,
    ...props
  }: {
    endingPoint: GeoPoint;
    startingPoint: GeoPoint;
    method?: CompassDirectionHintMethod;
  } & HintProps) {
    super(props);
    this.direction = this._generateDirection(startingPoint, endingPoint);
    this.method =
      method ??
      (MathUtils.getRandomFloat(100) > 50
        ? "from-opened-hint-pt"
        : "from-starting-pt");
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
      method: this.method,
    };
  }
}
