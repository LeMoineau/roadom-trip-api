import { Dish } from "../../shared/types/metier/Dish";
import { Hint, HintProps } from "../primitives/Hint.model";
import dishesController from "../../controllers/dishes.controller";
import { DishHintDto } from "../../shared/types/dto/hints/DishHint.dto";

const DEFAULT_DISH = {
  name: "unknown",
  desc: "no dish found for the ending state",
};

/**
 * Hint which give a dish according to ending state
 */
export class DishHint extends Hint {
  dish: Dish;

  constructor({ state, ...props }: { state: string } & HintProps) {
    super(props);
    this.dish = this._generateDish(state);
  }

  /**
   * Genere un type de chaussure a partir du climat du département de l'arrivée
   * @param endingPos
   * @returns
   */
  _generateDish(state: string): Dish {
    const dish = dishesController.get({ state: state.trim() });
    if (!!!dish) {
      console.warn(`no dish found for state "${state}"`);
    }
    return dish ?? DEFAULT_DISH;
  }

  toDto(): DishHintDto {
    return {
      ...super.toDto(),
      type: "dish-hint",
      dish: this.dish,
    };
  }
}
