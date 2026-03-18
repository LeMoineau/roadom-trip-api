import { ChallengeDto } from "./Challenge.dto";

export interface FuelStopChallengeDto extends ChallengeDto {
  type: "fuel-stop-challenge";
  message: "Si tu arrives à t'arrêter sur la pompe avec nombre rond (prix ou essence) tu peux parler à 3 personnes !";
  reward: "ask-3-person";
  nbOfUses: 1;
  photos: "needed";
  minPhotos: 1;
}
