import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import {
  NoseChallengeDto,
  NoseChallengeVariants,
} from "../../shared/types/dto/challenges/NoseChallenge.dto";
import { MathUtils } from "../../shared/utils/math.utils";

export class NoseChallenge extends Challenge {
  variants: NoseChallengeVariants;

  constructor({
    variants,
    ...props
  }: { variants?: "nose" | "hat" } & ChallengeProps) {
    super(props);
    this.variants =
      variants ?? (MathUtils.getRandomFloat(100) > 50 ? "nose" : "hat");
  }

  _generateMessage() {
    return `Appuie sur le ${this.variants === "nose" ? "nez" : "chapeau"} toutes à chaque fois que les heures et les minutes indiquent le même nombre pour avoir le droit de parler à 1 personne !`;
  }

  toDto(): NoseChallengeDto {
    return {
      ...super.toDto(),
      type: "nose-challenge",
      message: this._generateMessage(),
      variants: this.variants,
      reward: "ask-1-person",
      nbOfUses: "infinite",
      photos: "optional",
    };
  }
}
