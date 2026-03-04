import { ChallengeDto } from "../types/dto/challenges/Challenge.dto";
import { Step, StepProps } from "./Step.model";

export interface ChallengeProps extends StepProps {}

export class Challenge extends Step {
  constructor({ ...props }: ChallengeProps) {
    super(props);
  }

  toDto(): ChallengeDto {
    return {
      ...super.toDto(),
      type: "unknown",
    };
  }
}
