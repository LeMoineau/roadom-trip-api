import { HintDto } from "../types/dto/hints/Hint.dto";
import { Step, StepProps } from "./Step.model";

export interface HintProps extends StepProps {}

export class Hint extends Step {
  constructor({ ...props }: HintProps) {
    super(props);
  }

  /**
   * Convert the model into dto for transfer between services
   * @returns corresponding hint dto
   */
  toDto(): HintDto {
    return {
      ...super.toDto(),
      type: "unknown",
    };
  }
}
