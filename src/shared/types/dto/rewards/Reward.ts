import { DepartementHintDto } from "../hints/DepartementHint.dto";
import { StateHintDto } from "../hints/StateHint.dto";
import { BlasonHintDto } from "./../hints/BlasonHint.dto";
import { DishHintDto } from "./../hints/DishHint.dto";
import { CelebrityHintDto } from "./../hints/CelebrityHint.dto";

export type MediumHintDto = StateHintDto | BlasonHintDto | DishHintDto;
export type StrongHintDto = DepartementHintDto | CelebrityHintDto;

export type Reward =
  | "ask-1-person"
  | "ask-3-person"
  | "ask-infinite-person"
  | "allow-gps-5s"
  | MediumHintDto
  | StrongHintDto;
