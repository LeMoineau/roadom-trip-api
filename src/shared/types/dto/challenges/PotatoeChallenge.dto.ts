import { ChallengeDto } from "./Challenge.dto";

export interface PotatoeChallengeDto extends ChallengeDto {
  type: "potatoe-challenge";
  message: "À chaque fois que tu échanges un objet avec une personne, tu peux demander de l'aide à 1 personne !";
  reward: "ask-1-person";
  nbOfUses: "infinite";
  photos: "optional";
}
