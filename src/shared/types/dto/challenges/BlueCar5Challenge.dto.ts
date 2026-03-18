import { ChallengeDto } from "./Challenge.dto";

export interface BlueCar5ChallengeDto extends ChallengeDto {
  type: "5-blue-car-challenge";
  message: "Prends en photo 5 voitures bleues pour avoir le droit de parler à 1 personne !";
  reward: "ask-1-person";
  nbOfUses: 1;
  photos: "optional";
}
