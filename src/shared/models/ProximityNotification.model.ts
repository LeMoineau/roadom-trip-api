import { ProximityNotificationDto } from "../types/dto/notifications/ProximityNotification.dto";
import { Step, StepProps } from "./Step.model";

export interface ProximityNotificationProps extends StepProps {
  range: number;
}

export class ProximityNotification extends Step {
  range: number;

  /**
   * From this step, user will recieve a notification if he enter in range of {range}km around the
   * destination point
   * @param range detection range (in km)
   */
  constructor({ range, ...props }: ProximityNotificationProps) {
    super(props);
    this.range = range;
  }

  toDto(): ProximityNotificationDto {
    return {
      ...super.toDto(),
      type: "proximity-notification",
      range: this.range,
    };
  }
}
