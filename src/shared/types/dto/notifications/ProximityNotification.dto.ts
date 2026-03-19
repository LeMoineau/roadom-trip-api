import { StepDto } from "../Step.dto";

export interface ProximityNotificationDto extends StepDto {
  type: "proximity-notification";
  range: number;
}
