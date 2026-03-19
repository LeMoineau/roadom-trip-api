import { StepDto } from "./../Step.dto";

export type HintType = string;

export interface HintDto extends StepDto {
  type: HintType;
}
