import { HintDto } from "../types/dto/hints/Hint.dto";
import { Step, StepProps } from "./Step.model";

export interface HintProps extends StepProps {}

export class Hint extends Step {
  constructor({ ...props }: HintProps) {
    super(props);
  }

  toDto(): HintDto {
    return {
      ...super.toDto(),
      type: "unknown",
    };
  }
}
