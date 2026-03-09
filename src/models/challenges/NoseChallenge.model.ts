import { Challenge, ChallengeProps } from "../../shared/models/Challenge.model";
import { NoseChallengeDto } from "../../shared/types/dto/challenges/NoseChallenge.dto";

export class NoseChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): NoseChallengeDto {
    return {
      ...super.toDto(),
      type: "nose-challenge",
      message:
        "Appuie sur le nez toutes à chaque fois que les heures et les minutes indiquent le même nombre pour avoir le droit de parler à 1 personne !",
      reward: "ask-1-person",
      nbOfUses: "infinite",
      photos: "optional",
    };
  }
}
