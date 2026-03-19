import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { PotatoeChallengeDto } from "../../shared/types/dto/challenges/PotatoeChallenge.dto";

export class PotatoeChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): PotatoeChallengeDto {
    return {
      ...super.toDto(),
      type: "potatoe-challenge",
      message:
        "À chaque fois que tu échanges un objet avec une personne, tu peux demander de l'aide à 1 personne !",
      reward: "ask-1-person",
      nbOfUses: "infinite",
      photos: "optional",
    };
  }
}
