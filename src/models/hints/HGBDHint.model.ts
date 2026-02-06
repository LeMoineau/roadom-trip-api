import {
  HGBDHintDirection,
  HGBDHintDto,
  HGBDHintMethodGenerationDirection,
} from "../../../../shared/src/types/dto/hints/HGBDHint.dto";
import { GeoUtils } from "../../../../shared/src/utils/geo.utils";
import { MathUtils } from "../../../../shared/src/utils/math.utils";
import { GeoPoint } from "../../../../shared/src/models/GeoPoint.model";
import { Hint } from "../../../../shared/src/models/hints/Hint.model";

/**
 * Points for France
 */
const HAUT_PT = new GeoPoint({ lat: 50.892544, lon: 2.158307 });
const GAUCHE_PT = new GeoPoint({ lat: 48.22401, lon: -3.915764 });
const BAS_PT = new GeoPoint({ lat: 42.915282, lon: 2.783285 });
const DROITE_PT = new GeoPoint({ lat: 46.988664, lon: 7.033357 });

/**
 * Hint which give direction in "haut", "gauche", "bas", "droite" according to :
 * - direction of ending point from starting point
 * - position of ending point in France
 */
export class HGBDHint extends Hint {
  direction: HGBDHintDirection;
  methodGenerationDirection: HGBDHintMethodGenerationDirection;

  constructor({
    startingPos,
    endingPos,
    methodGenerationDirection,
  }: {
    startingPos: GeoPoint;
    endingPos: GeoPoint;
    methodGenerationDirection?: HGBDHintMethodGenerationDirection;
  }) {
    super();
    this.methodGenerationDirection =
      methodGenerationDirection ??
      (MathUtils.getRandomFloat(100) > 50
        ? "from-starting-pos"
        : "from-ending-pos");
    this.direction =
      this.methodGenerationDirection === "from-starting-pos"
        ? this._generateDirectionFromStartingPos(startingPos, endingPos)
        : this._generateDirectionFromEndingPos(endingPos);
  }

  /**
   * Generate direction from direction of ending pos from starting pos
   * - if ending pos is upper/north of starting pos -> "haut"
   */
  _generateDirectionFromStartingPos(
    startingPos: GeoPoint,
    endingPos: GeoPoint,
  ): HGBDHintDirection {
    const diffX = endingPos.lon - startingPos.lon;
    const diffY = endingPos.lat - startingPos.lat;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      return diffX > 0 ? "droite" : "gauche";
    }
    return diffY > 0 ? "haut" : "bas";
  }

  /**
   * Generate direction from position of ending pos in France
   * - if ending pos is at Marseille -> "bas"
   */
  _generateDirectionFromEndingPos(endingPos: GeoPoint): HGBDHintDirection {
    const distHaut = GeoUtils.getDistanceBetween(endingPos, HAUT_PT);
    const distGauche = GeoUtils.getDistanceBetween(endingPos, GAUCHE_PT);
    const distBas = GeoUtils.getDistanceBetween(endingPos, BAS_PT);
    const distDroite = GeoUtils.getDistanceBetween(endingPos, DROITE_PT);
    const minDistance = Math.min(distHaut, distGauche, distBas, distDroite);
    if (minDistance === distHaut) return "haut";
    if (minDistance === distGauche) return "gauche";
    if (minDistance === distBas) return "bas";
    return "droite";
  }

  toDto(): HGBDHintDto {
    return {
      type: "haut-gauche-bas-droite-hint",
      direction: this.direction,
      methodGenerationDirection: this.methodGenerationDirection,
    };
  }
}
