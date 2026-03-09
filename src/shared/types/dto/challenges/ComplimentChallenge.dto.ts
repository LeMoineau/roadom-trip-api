import { ChallengeDto } from "./Challenge.dto";

export interface ComplimentChallengeDto extends ChallengeDto {
  type: "compliment-challenge";
  message: "Si tu vas voir 1 personne pour lui dire un compliment, tu peux lui demander de t'aider !";
  reward: "ask-1-person";
  nbOfUses: 3;
  photos: "optional";
}
