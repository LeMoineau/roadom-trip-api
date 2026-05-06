import { StepDto } from "../../shared/types/dto/Step.dto";
import { v4 as uuidv4 } from "uuid";

export interface StepProps {
  id?: string;
  availableAt: Date;
  reach?: boolean;
}

export class Step {
  id: string;
  availableAt: Date;
  reach: boolean;

  constructor({ id = uuidv4(), availableAt, reach }: StepProps) {
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
