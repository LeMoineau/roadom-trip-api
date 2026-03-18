import { ChallengeDto } from "./Challenge.dto";

export type NoseChallengeVariants = "nose" | "hat";

export interface NoseChallengeDto extends ChallengeDto {
  type: "nose-challenge";
  message: string;
  variants: NoseChallengeVariants;
  reward: "ask-1-person";
  nbOfUses: "infinite";
  photos: "optional";
}
