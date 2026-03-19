import { Climat } from "../../shared/types/geo/Climat";
import { DepartementCode } from "../../shared/types/geo/Departement";
import climatsController from "../../controllers/climats.controller";
import { Shoes } from "../../shared/types/metier/Shoes";
import { Hint, HintProps } from "../primitives/Hint.model";
import { ShoesHintDto } from "../../shared/types/dto/hints/ShoesHint.dto";

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
  shoes: Shoes;

  constructor({
    departementCode,
    ...props
  }: { departementCode?: DepartementCode } & HintProps) {
    super(props);
    this.shoes = this._generateShoes(departementCode);
  }

  /**
   * Genere un type de chaussure a partir du climat du département de l'arrivée
   * @param endingPos
   * @returns
   */
  _generateShoes(departementCode?: DepartementCode): Shoes {
    if (!!!departementCode) return DEFAULT_SHOES;
    const climat = climatsController.get({ departementCode });
    if (!!!climat) return DEFAULT_SHOES;
    return CORRESPONDANCES_SHOES[climat];
  }

  toDto(): ShoesHintDto {
    return {
      ...super.toDto(),
      type: "shoes-hint",
      shoes: this.shoes,
    };
  }
}
