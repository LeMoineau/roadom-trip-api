import { DateString } from "../../primitives/Date";
import { Reward } from "../rewards/Reward";
import { StepDto } from "../Step.dto";

export interface ChallengeDto extends StepDto {
  type: string;
  message?: string;
  reward?: Reward;
  nbOfUses: number | "infinite";
  photos?: "needed" | "optional";
  minPhotos?: number;
  used?: boolean;
  timeUsed?: number;
  finishDate?: DateString;
}
