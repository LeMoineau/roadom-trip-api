import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { FuelStopChallengeDto } from "../../shared/types/dto/challenges/FuelStopChallenge.dto";

export class FuelStopChallenge extends Challenge {
  constructor({ ...props }: {} & ChallengeProps) {
    super(props);
  }

  toDto(): FuelStopChallengeDto {
    return {
      ...super.toDto(),
      type: "fuel-stop-challenge",
      message:
        "Si tu arrives à t'arrêter sur la pompe avec nombre rond (prix ou essence) tu peux parler à 3 personnes !",
      reward: "ask-3-person",
      nbOfUses: 1,
      photos: "needed",
      minPhotos: 1,
    };
  }
}
