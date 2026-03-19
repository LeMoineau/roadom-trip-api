import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { ComplimentChallengeDto } from "../../shared/types/dto/challenges/ComplimentChallenge.dto";

export class ComplimentChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): ComplimentChallengeDto {
    return {
      ...super.toDto(),
      type: "compliment-challenge",
      message:
        "Si tu vas voir 1 personne pour lui dire un compliment, tu peux lui demander de t'aider !",
      reward: "ask-1-person",
      nbOfUses: 3,
      photos: "optional",
    };
  }
}
