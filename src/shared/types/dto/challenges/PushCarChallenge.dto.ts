import { ChallengeDto } from "./Challenge.dto";

export interface PushCarChallengeDto extends ChallengeDto {
  type: "push-car-challenge";
  message: "Si tu pousse ta voiture sur 10m, tu peux parler avec tout le monde en illimité";
  reward: "ask-infinite-person";
  nbOfUses: 1;
  photos: "needed";
  minPhotos: 1;
}
