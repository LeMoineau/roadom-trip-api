import moment from "moment";
import { Step } from "../../shared/models/Step.model";
import { Trip } from "../../shared/models/Trip.model";
import { Departement } from "../../shared/types/geo/Departement";
import { OSMResponse } from "../../shared/types/osm/OSMResponse";
import { WikipediaFormattedPage } from "../../shared/types/wikipedia/Wikipedia";

/**
 * Instance of global variables for steps factory containing :
 * - trip
 * - steps
 * - currentTime
 * - endingDetails (OSMResponse)
 * - endingDepartement (Departement)
 */
export class GlobalStepsVariables {
  trip: Trip;
  steps: Step[];
  currentTime: Date;
  endingDetails?: OSMResponse;
  endingDepartement?: Departement;
  endingWikipediaPage?: WikipediaFormattedPage;

  constructor({
    trip,
    currentTime,
    endingDetails,
    endingDepartement,
    endingWikipediaPage,
  }: {
    trip: Trip;
    currentTime?: Date;
    endingDetails?: OSMResponse;
    endingDepartement?: Departement;
    endingWikipediaPage?: WikipediaFormattedPage;
  }) {
    this.trip = trip;
    this.steps = [];
    this.currentTime = currentTime ?? new Date();
    this.endingDetails = endingDetails;
    this.endingDepartement = endingDepartement;
    this.endingWikipediaPage = endingWikipediaPage;
  }

  pushStep(step: Step) {
    this.steps.push(step);
    this.incrementCurrentTime();
  }

  tryPushStep(stepName: string, step?: Step | false) {
    if (!!!step) {
      this.logStepLack(stepName);
    } else {
      this.pushStep(step);
    }
  }

  incrementCurrentTime() {
    this.currentTime = moment(this.currentTime).add(30, "m").toDate();
  }

  logStepLack(stepName: string) {
    console.warn(`trip #${this.trip.id}: no ${stepName}`);
  }
}
