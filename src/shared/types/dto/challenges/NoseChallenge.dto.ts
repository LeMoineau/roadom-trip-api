import { ChallengeDto } from "./Challenge.dto";

export interface NoseChallengeDto extends ChallengeDto {
  type: "nose-challenge";
  message: "Appuie sur le nez toutes à chaque fois que les heures et les minutes indiquent le même nombre pour avoir le droit de parler à 1 personne !";
  reward: "ask-1-person";
  nbOfUses: "infinite";
  photos: "optional";
}
