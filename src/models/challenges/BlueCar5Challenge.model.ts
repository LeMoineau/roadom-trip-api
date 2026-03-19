import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { BlueCar5ChallengeDto } from "../../shared/types/dto/challenges/BlueCar5Challenge.dto";

export class BlueCar5Challenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): BlueCar5ChallengeDto {
    return {
      ...super.toDto(),
      type: "5-blue-car-challenge",
      message:
        "Prends en photo 5 voitures bleues pour avoir le droit de parler à 1 personne !",
      reward: "ask-1-person",
      photos: "optional",
      nbOfUses: 1,
    };
  }
}
