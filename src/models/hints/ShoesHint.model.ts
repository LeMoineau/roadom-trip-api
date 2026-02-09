import { ShoesHintDto } from "../../../../shared/src/types/dto/hints/ShoesHint.dto";
import { Hint } from "../../../../shared/src/models/hints/Hint.model";
import climatService from "../../services/climat.service";
import { Shoes } from "../../shared/types/shoes/Shoes";
import { Climat } from "../../shared/types/geo/Climat";
import { DepartementCode } from "../../shared/types/geo/Departement";

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
export class ShoesHint extends Hint {
  shoes: string;

  constructor({ departementCode }: { departementCode: DepartementCode }) {
    super();
    this.shoes = this._generateShoes(departementCode);
  }

  /**
   * Genere un type de chaussure a partir du climat du département de l'arrivée
   * @param endingPos
   * @returns
   */
  _generateShoes(departementCode: DepartementCode): Shoes {
    const climat = climatService.get({ departementCode });
    if (!!!climat) return DEFAULT_SHOES;
    return CORRESPONDANCES_SHOES[climat];
  }

  toDto(): ShoesHintDto {
    return {
      type: "shoes-hint",
      shoes: this.shoes,
    };
  }
}
