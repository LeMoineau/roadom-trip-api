import { ShoesHintDto } from "../../../../shared/src/types/dto/hints/ShoesHint.dto";
import { GeoPoint } from "../../../../shared/src/models/GeoPoint.model";
import {
  Hint,
  InitilizableHint,
} from "../../../../shared/src/models/hints/Hint.model";
import osmService from "../../services/osm.service";
import departementsController from "../../controllers/departements.controller";
import climatService from "../../services/climat.service";
import { Shoes } from "../../shared/types/shoes/Shoes";
import { Climat } from "../../shared/types/geo/Climat";

const DEFAULT_SHOES: Shoes = "Chaussures de sport";
const CORRESPONDANCES_SHOES: { [s in Climat]: Shoes } = {
  océanique: "Bottes",
  équatorial: "Tongues",
  tropical: "Tongues",
  "océanique dégradé": "Chaussures de sport",
  "semi-continental": "Sandales",
  montagnard: "Chaussures de randonnée",
  méditerranéen: "Claquettes",
};

/**
 * Hint which give a type of shoes according to ending departement
 */
export class ShoesHint extends Hint implements InitilizableHint {
  endingPos: GeoPoint;
  shoes?: string;

  constructor({ endingPos }: { endingPos: GeoPoint }) {
    super();
    this.endingPos = endingPos;
  }

  async init() {
    this.shoes = await this._generateShoes(this.endingPos);
  }

  /**
   * Genere un type de chaussure a partir du climat du département de l'arrivée
   * @param endingPos
   * @returns
   */
  async _generateShoes(endingPos: GeoPoint): Promise<Shoes> {
    const osm = await osmService.reverse({
      lat: endingPos.lat,
      lon: endingPos.lon,
      zoom: 17,
    });
    if (!!!osm) return DEFAULT_SHOES;
    const departement = departementsController.get({
      name: osm.address["ISO3166-2-lvl6"],
      libelle: osm.address.county,
    });
    if (!!!departement) return DEFAULT_SHOES;
    const climat = climatService.get({ departement });
    if (!!!climat) return DEFAULT_SHOES;
    return CORRESPONDANCES_SHOES[climat];
  }

  toDto(): ShoesHintDto {
    if (!!!this.shoes) {
      throw new Error("shoes hint has not been initialized");
    }
    return {
      type: "shoes-hint",
      shoes: this.shoes,
    };
  }
}
