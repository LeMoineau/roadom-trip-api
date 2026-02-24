import { StepDto } from "../types/dto/Step.dto";

export interface StepProps {
  availableAt: Date;
  reach?: boolean;
}

export class Step {
  availableAt: Date;
  reach: boolean;

  constructor({ availableAt, reach }: StepProps) {
    this.availableAt = availableAt;
    this.reach = !!reach;
  }

  toDto(): StepDto {
    return {
      availableAt: this.availableAt,
      reach: this.reach,
    };
  }
}
