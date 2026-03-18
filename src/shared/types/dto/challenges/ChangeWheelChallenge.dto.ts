import { ChallengeDto } from "./Challenge.dto";

export interface ChangeWheelChallengeDto extends ChallengeDto {
  type: "change-wheel-challenge";
  message: "Si tu change une roue en moins de 3 minutes, tu as accès à un GPS 5 secondes !";
  reward: "allow-gps-5s";
  nbOfUses: 1;
  photos: "needed";
  minPhotos: 1;
}
