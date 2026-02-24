import { StepDto } from "../Step.dto";

export interface ChallengeDto extends StepDto {
  type: string;
  reward?: any;
  nbOfUses?: number | "infinite";
  photos?: "needed" | "optional";
  minPhotos?: number;
}
