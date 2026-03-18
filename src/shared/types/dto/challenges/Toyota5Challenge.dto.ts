import { ChallengeDto } from "./Challenge.dto";

export interface Toyota5ChallengeDto extends ChallengeDto {
  type: "5-toyota-challenge";
  message: "Prends en photo 5 Toyota pour avoir le droit de parler à 1 personne !";
  reward: "ask-1-person";
  nbOfUses: 1;
  photos: "optional";
}
