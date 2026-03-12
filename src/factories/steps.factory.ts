import moment from "moment";
import { Step } from "../shared/models/Step.model";
import { Trip } from "../shared/models/Trip.model";
import { HGBDHint } from "../models/hints/HGBDHint.model";
import { ShoesHint } from "../models/hints/ShoesHint.model";
import { NoseChallenge } from "../models/challenges/NoseChallenge.model";
import { CelebrityHint } from "../models/hints/CelebrityHint.model";
import { PotatoeChallenge } from "../models/challenges/PotatoeChallenge.model";
import { StateHint } from "../models/hints/StateHint.model";
import { BlasonHint } from "../models/hints/BlasonHint.model";
import { Toyota5Challenge } from "../models/challenges/Toyota5Challenge.model";
import { DishHint } from "../models/hints/DishHint.model";
import { BlueCar5Challenge } from "../models/challenges/BlueCar5Challenge.model";
import { AttractionChallenge } from "../models/challenges/AttractionChallenge.model";
import { ComplimentChallenge } from "../models/challenges/ComplimentChallenge.model";
import { FuelStopChallenge } from "../models/challenges/FuelStopChallenge.model";
import { StateProductChallenge } from "../models/challenges/StateProductChallenge.model";
import { DepartementHint } from "../models/hints/DepartementHint.model";
import { TourismHint } from "../models/hints/TourismHint.model";
import { CompassDirectionHint } from "../models/hints/CompassDirectionHint.model";
import osmService from "../services/osm.service";
import departementsController from "../controllers/departements.controller";
import { OSMResponse } from "../shared/types/osm/OSMResponse";
import { Departement } from "../shared/types/geo/Departement";
import googleMapsService from "../services/google-maps.service";
import { GeoPoint } from "../shared/models/GeoPoint.model";

/**
 * TODO: phase 4
 * - NearCityHint
 * - FuelStopChallenge,
 * - StateProductChallenge,
 * - ChangeWheelChallenge,
 * - PushCarChallenge
 */

interface StepsGlobalVariables {
  trip: Trip;
  steps: Step[];
  currentTime: Date;
  endingDetails?: OSMResponse;
  endingDepartement?: Departement;
}

class StepsFactory {
  /**
   * create new steps from a targeted trip
   * @param _trip targeted trip
   * @returns array of step for the targeted trip
   */
  async create(_trip: Trip): Promise<Step[]> {
    let globalVariables = await this._calculateGlobalVariables(_trip);

    this._generatePhase1(globalVariables);
    this._generatePhase2(globalVariables);
    this._generatePhase3(globalVariables);

    return globalVariables.steps;
  }

  /**
   * Calculate global variables for steps generation
   * @param trip target trip
   * @returns object of variables
   */
  async _calculateGlobalVariables(trip: Trip): Promise<StepsGlobalVariables> {
    const endingDetails = await osmService.reverse({
      lat: trip.endingPos.lat,
      lon: trip.endingPos.lon,
      zoom: 17,
    });
    const endingDepartement = endingDetails
      ? departementsController.get({
          name: endingDetails.address["ISO3166-2-lvl6"],
          libelle: endingDetails.address.county,
        })
      : undefined;
    return {
      trip,
      steps: [],
      currentTime: new Date(),
      endingDetails,
      endingDepartement,
    };
  }

  _incrementCurrentTime(currentTime: Date): Date {
    return moment(currentTime).add(30, "m").toDate();
  }

  /**
   * Generate hints and challenges of phase 1 :
   * - HGBDHint,
   * - ShoesHint,
   * - NoseChallenge,
   * - TourismHint,
   * - ???,
   * - PotatoeChallenge,
   *
   * @param variables global steps variables
   */
  async _generatePhase1({
    trip,
    steps,
    currentTime,
    endingDepartement,
  }: StepsGlobalVariables) {
    steps.push(
      new HGBDHint({
        startingPos: trip.startingPos,
        endingPos: trip.endingPos,
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    steps.push(
      new ShoesHint({
        departementCode: endingDepartement?.code,
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    steps.push(
      new NoseChallenge({
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    if (!!!endingDepartement) {
      console.warn("no tourism hint because no departement");
    } else {
      steps.push(
        new TourismHint({
          endingDepartementCode: endingDepartement.code,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
    //TODO: creating new phase 1 hint
    steps.push(
      new PotatoeChallenge({
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
  }

  /**
   * Generate hints and challenges of phase 2 :
   * - StateHint,
   * - BlasonHint,
   * - BlueCar5Challenge,
   * - DishHint
   * - RebusHint
   * - Toyota5Challenge,
   *
   * @param variables global steps variables
   */
  async _generatePhase2({
    trip,
    steps,
    currentTime,
    endingDetails,
    endingDepartement,
  }: StepsGlobalVariables) {
    if (!!!endingDetails) {
      console.warn("no state hint because no ending details");
    } else {
      steps.push(
        new StateHint({
          stateLibelle: endingDetails.address.state,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
    if (!!!endingDepartement) {
      console.warn("no blason hint because no departement");
    } else {
      steps.push(
        new BlasonHint({
          departementCode: endingDepartement.code,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
    steps.push(
      new BlueCar5Challenge({
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    if (!!!endingDetails) {
      console.warn("no dish hint because no ending details");
    } else {
      steps.push(
        new DishHint({
          state: endingDetails.address.state,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
    //TODO: rebusHint
    steps.push(
      new Toyota5Challenge({
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
  }

  /**
   * Generate hints and challenges of phase 3 :
   * - DepartementHint,
   * - CelebrityHint,
   * - AttractionChallenge,
   * - PreciseDescriptionHint
   * - CompassDirectionHint,
   * - ComplimentChallenge,
   *
   * @param variables global steps variables
   */
  async _generatePhase3({
    trip,
    steps,
    currentTime,
    endingDetails,
    endingDepartement,
  }: StepsGlobalVariables) {
    if (!!!endingDepartement) {
      console.warn("no departement hint because no ending details");
    } else {
      steps.push(
        new DepartementHint({
          departementLibelle: endingDepartement.libelle,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
    steps.push(
      new CelebrityHint({
        endingPoint: trip.endingPos,
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    this._generateAttractionChallenge({
      trip,
      steps,
      currentTime,
      endingDepartement,
      endingDetails,
    });
    //TODO: PreciseDescriptionHint
    steps.push(
      new CompassDirectionHint({
        endingPoint: trip.endingPos,
        startingPoint: trip.startingPos,
        availableAt: currentTime,
      }),
    );
    currentTime = this._incrementCurrentTime(currentTime);
    steps.push(new ComplimentChallenge({ availableAt: currentTime }));
    currentTime = this._incrementCurrentTime(currentTime);
  }

  async _generateAttractionChallenge({
    trip,
    currentTime,
    steps,
    endingDepartement,
  }: StepsGlobalVariables): Promise<void> {
    const middlePoint = new GeoPoint({
      lat: (trip.startingPos.lat + trip.endingPos.lat) / 2,
      lon: (trip.startingPos.lon + trip.endingPos.lon) / 2,
    });
    const attractions = await googleMapsService.nearbySearch({
      keyword: "attractions",
      location: [middlePoint.lat, middlePoint.lon],
      radius: 15000,
    });
    if (!!!attractions) {
      console.warn("no attraction challenge because no attractions found");
    } else {
      steps.push(
        new AttractionChallenge({
          rewardedHint: new BlasonHint({
            departementCode: endingDepartement!.code,
            availableAt: currentTime,
          }).toDto(),
          attractions,
          availableAt: currentTime,
        }),
      );
      currentTime = this._incrementCurrentTime(currentTime);
    }
  }
}

export default new StepsFactory();
