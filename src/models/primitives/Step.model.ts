import { StepDto } from "../../shared/types/dto/Step.dto";
import { randomUUID } from "crypto";

export interface StepProps {
  id?: string;
  availableAt: Date;
  reach?: boolean;
}

export class Step {
  id: string;
  availableAt: Date;
  reach: boolean;

  constructor({ id = randomUUID(), availableAt, reach }: StepProps) {
    this.id = id;
    this.availableAt = availableAt;
    this.reach = !!reach;
  }

  /**
   * Convert the model into dto for transfer between services
   * @returns corresponding hint dto
   */
  toDto(): StepDto {
    return {
      id: this.id,
      type: "unknown",
      availableAt: this.availableAt,
      reach: this.reach,
    };
  }
}
