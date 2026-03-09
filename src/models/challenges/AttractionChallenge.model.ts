import { Challenge, ChallengeProps } from "../../shared/models/Challenge.model";
import { AttractionChallengeDto } from "../../shared/types/dto/challenges/AttractionChallenge.dto";
import { MediumHintDto } from "../../shared/types/dto/rewards/Reward";

export class AttractionChallenge extends Challenge {
  attraction: any;
  rewardedHint: MediumHintDto;

  constructor({
    attraction,
    rewardedHint,
    ...props
  }: { attraction: any; rewardedHint: MediumHintDto } & ChallengeProps) {
    super(props);
    this.attraction = attraction;
    this.rewardedHint = rewardedHint;
  }

  toDto(): AttractionChallengeDto {
    return {
      ...super.toDto(),
      type: "attraction-challenge",
      message:
        "Si tu atteins un lieux stylé précisé (parc d'attraction, lieu historique, etc…) sur le chemin, tu obtiendras un nouvel indice !",
      reward: this.rewardedHint,
      attraction: this.attraction,
      nbOfUses: 1,
      photos: "needed",
    };
  }
}
