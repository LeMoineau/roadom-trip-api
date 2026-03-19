import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { StateProductChallengeDto } from "../../shared/types/dto/challenges/StateProductChallenge.dto";
import { StrongHintDto } from "../../shared/types/dto/rewards/Reward";

export class StateProductChallenge extends Challenge {
  message: string;
  rewardedHint: StrongHintDto;

  constructor({
    stateLibelle,
    rewardedHint,
    ...props
  }: { stateLibelle: string; rewardedHint: StrongHintDto } & ChallengeProps) {
    super(props);
    this.message = this._generateMessage(stateLibelle);
    this.rewardedHint = rewardedHint;
  }

  _generateMessage(stateLibelle: string): string {
    return `Si tu trouves un produit de la région ${stateLibelle}, tu obtiendras un indice du niveau supérieur !`;
  }

  toDto(): StateProductChallengeDto {
    return {
      ...super.toDto(),
      type: "state-product-challenge",
      message: this.message,
      reward: this.rewardedHint,
      nbOfUses: 1,
      photos: "needed",
      minPhotos: 1,
    };
  }
}
