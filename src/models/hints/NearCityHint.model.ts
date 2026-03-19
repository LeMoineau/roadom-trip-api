import { Hint, HintProps } from "../primitives/Hint.model";
import { NearCityHintDto } from "../../shared/types/dto/hints/NearCityHint.dto";

export class NearCityHint extends Hint {
  city: string;

  constructor({ city, ...props }: { city: string } & HintProps) {
    super(props);
    this.city = city;
  }

  toDto(): NearCityHintDto {
    return {
      ...super.toDto(),
      type: "near-city-hint",
      message: `La ville "${this.city}" est juste à côté de votre destination !`,
      city: this.city,
    };
  }
}
