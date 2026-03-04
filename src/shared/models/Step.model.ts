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

  /**
   * Convert the model into dto for transfer between services
   * @returns corresponding hint dto
   */
  toDto(): StepDto {
    return {
      availableAt: this.availableAt,
      reach: this.reach,
    };
  }
}
