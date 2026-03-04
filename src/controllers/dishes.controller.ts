import { dishes } from "../constants/dishes";
import { Dish } from "../shared/types/metier/Dish";
import { ArrayUtils } from "../shared/utils/array.utils";

class DishesController {
  constructor() {}

  get({ state }: { state: string }): Dish | undefined {
    const targetDishes = dishes.find((s) => s.state === state)?.dishes;
    return targetDishes ? ArrayUtils.getRandomItem(targetDishes) : undefined;
  }
}

export default new DishesController();
