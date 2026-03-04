import { StepDto } from "./../Step.dto";

export type HintType = String;

export interface HintDto extends StepDto {
  type: HintType;
}
