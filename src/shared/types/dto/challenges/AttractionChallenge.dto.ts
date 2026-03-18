import { MediumHintDto } from "../rewards/Reward";
import { ChallengeDto } from "./Challenge.dto";

export interface AttractionChallengeDto extends ChallengeDto {
  type: "attraction-challenge";
  message: "Si tu atteins un lieux stylé précisé (parc d'attraction, lieu historique, etc…) sur le chemin, tu obtiendras un nouvel indice !";
  reward: MediumHintDto;
  attraction: any;
  nbOfUses: 1;
  photos: "needed";
  minPhotos: 1;
}
