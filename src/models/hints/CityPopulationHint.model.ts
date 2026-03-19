import { Hint, HintProps } from "../primitives/Hint.model";
import { CityPopulationHintDto } from "../../shared/types/dto/hints/CityPopulationHint.dto";

export class CityPopulationHint extends Hint {
  population: string;

  constructor({ population, ...props }: { population: string } & HintProps) {
    super(props);
    this.population = population;
  }

  toDto(): CityPopulationHintDto {
    return {
      ...super.toDto(),
      type: "city-population-hint",
      population: this.population,
      message: `La population de votre ville d'arrivée est : ${this.population}`,
    };
  }
}
