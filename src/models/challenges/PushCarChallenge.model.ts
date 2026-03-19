import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { PushCarChallengeDto } from "../../shared/types/dto/challenges/PushCarChallenge.dto";

export class PushCarChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): PushCarChallengeDto {
    return {
      ...super.toDto(),
      type: "push-car-challenge",
      message:
        "Si tu pousse ta voiture sur 10m, tu peux parler avec tout le monde en illimité",
      reward: "ask-infinite-person",
      photos: "needed",
      nbOfUses: 1,
      minPhotos: 1,
    };
  }
}
