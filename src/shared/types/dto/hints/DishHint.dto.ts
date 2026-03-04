import { Dish } from "../../metier/Dish";
import { HintDto } from "./Hint.dto";

export interface DishHintDto extends HintDto {
  type: "dish-hint";
  dish: Dish;
}
