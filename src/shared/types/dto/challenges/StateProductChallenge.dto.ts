import { StrongHintDto } from "../rewards/Reward";
import { ChallengeDto } from "./Challenge.dto";

export interface StateProductChallengeDto extends ChallengeDto {
  type: "state-product-challenge";
  message: string;
  reward: StrongHintDto;
  nbOfUses: 1;
  photos: "needed";
  minPhotos: 1;
}
