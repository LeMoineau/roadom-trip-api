import { Step } from "../shared/models/Step.model";
import { Trip } from "../shared/models/Trip.model";

class StepsFactory {
  async create(trip: Trip): Promise<Step[]> {
    //TODO: generate trip steps from trip
    return [];
  }
}

export default new StepsFactory();
