import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { Toyota5ChallengeDto } from "../../shared/types/dto/challenges/Toyota5Challenge.dto";

export class Toyota5Challenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): Toyota5ChallengeDto {
    return {
      ...super.toDto(),
      type: "5-toyota-challenge",
      message:
        "Prends en photo 5 Toyota pour avoir le droit de parler à 1 personne !",
      reward: "ask-1-person",
      photos: "optional",
      nbOfUses: 1,
    };
  }
}
