import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { ChangeWheelChallengeDto } from "../../shared/types/dto/challenges/ChangeWheelChallenge.dto";

export class ChangeWheelChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): ChangeWheelChallengeDto {
    return {
      ...super.toDto(),
      type: "change-wheel-challenge",
      message:
        "Si tu change une roue en moins de 3 minutes, tu as accès à un GPS 5 secondes !",
      reward: "allow-gps-5s",
      photos: "needed",
      nbOfUses: 1,
      minPhotos: 1,
    };
  }
}
