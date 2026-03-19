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
    endingDepartement,
    endingWikipediaPage,
  }: {
    trip: Trip;
    currentTime?: Date;
    endingDepartement?: Departement;
    endingWikipediaPage?: WikipediaFormattedPage;
  }) {
    this.trip = trip;
    this.steps = [];
    this.currentTime = currentTime ?? new Date();
    this.endingDetails = trip.osmEndingDetails;
    this.endingDepartement = endingDepartement;
    this.endingWikipediaPage = endingWikipediaPage;
  }

  pushStep(step: Step, props?: { dontIncrementCurrentTime?: boolean }) {
    this.steps.push(step);
    if (!!!props?.dontIncrementCurrentTime) this.incrementCurrentTime();
  }

  tryPushStep(
    stepName: string,
    step?: Step | false,
    props?: { dontIncrementCurrentTime?: boolean },
  ) {
    if (!!!step) {
      this.logStepLack(stepName);
    } else {
      this.pushStep(step, {
        dontIncrementCurrentTime: props?.dontIncrementCurrentTime,
      });
    }
  }

  incrementCurrentTime() {
    this.currentTime = moment(this.currentTime).add(30, "m").toDate();
  }

  logStepLack(stepName: string) {
    console.warn(`trip #${this.trip.id}: no ${stepName}`);
  }
}
