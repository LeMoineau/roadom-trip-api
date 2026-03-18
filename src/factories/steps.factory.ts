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
import googleMapsService from "../services/google-maps.service";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { GlobalStepsVariables } from "../utils/models/GlobalStepsVariables";
import wikidataService from "../services/wikidata.service";
import { CityPopulationHint } from "../models/hints/CityPopulationHint.model";
import wikipediaService from "../services/wikipedia.service";
import { anonymiseWikipediaPage } from "../utils/functions/anonymise-wikipedia-page";
import { PreciseDescriptionHint } from "../models/hints/PreciseDescriptionHint.model";
import { RebusHint } from "../models/hints/RebusHint.model";
import { ChangeWheelChallenge } from "../models/challenges/ChangeWheelChallenge.model";
import { PushCarChallenge } from "../models/challenges/PushCarChallenge.model";

class StepsFactory {
  /**
   * create new steps from a targeted trip
   * @param _trip targeted trip
   * @returns array of step for the targeted trip
   */
  async create(_trip: Trip): Promise<Step[]> {
    const vars = await this._calculateGlobalVariables(_trip);

    //TODO: pouvoir parametrer duree max qui peut limiter nombre de phase (par defaut 9h donc 3 phases)
    //TODO: pouvoir parametrer duree entre chaque etape (par defaut 30min)
    this._generatePhase1(vars);
    this._generatePhase2(vars);
    this._generatePhase3(vars);
    this._generatePhase4(vars);

    return vars.steps;
  }

  /**
   * Calculate global variables for steps generation
   * @param trip target trip
   * @returns object of variables
   */
  async _calculateGlobalVariables(trip: Trip): Promise<GlobalStepsVariables> {
    const endingDetails = await osmService.reverse({
      lat: trip.endingPos.lat,
      lon: trip.endingPos.lon,
      zoom: 17,
    });
    let endingDepartement;
    let endingWikipediaPage;
    if (!!endingDetails) {
      endingDepartement = departementsController.get({
        name: endingDetails.address["ISO3166-2-lvl6"],
        libelle: endingDetails.address.county,
      });
      endingWikipediaPage = await wikipediaService.getFormattedPage({
        title: endingDetails.address.village,
      });
      if (!!endingWikipediaPage) {
        endingWikipediaPage = anonymiseWikipediaPage(
          endingWikipediaPage,
          endingDetails.address.village,
        );
      }
    }
    return new GlobalStepsVariables({
      trip,
      endingDetails,
      endingDepartement,
      endingWikipediaPage,
    });
  }

  /**
   * Generate hints and challenges of phase 1 :
   * - HGBDHint,
   * - ShoesHint,
   * - NoseChallenge,
   * - TourismHint,
   * - CityPopulationHint,
   * - PotatoeChallenge,
   *
   * @param variables global steps variables
   */
  async _generatePhase1(vars: GlobalStepsVariables) {
    vars.pushStep(
      new HGBDHint({
        startingPos: vars.trip.startingPos,
        endingPos: vars.trip.endingPos,
        availableAt: vars.currentTime,
      }),
    );
    vars.pushStep(
      new ShoesHint({
        departementCode: vars.endingDepartement?.code,
        availableAt: vars.currentTime,
      }),
    );
    vars.pushStep(
      new NoseChallenge({
        availableAt: vars.currentTime,
      }),
    );
    vars.tryPushStep(
      "tourism hint",
      !!vars.endingDepartement &&
        new TourismHint({
          endingDepartementCode: vars.endingDepartement.code,
          availableAt: vars.currentTime,
        }),
    );
    if (!!!vars.endingDetails?.address.village) {
      vars.logStepLack("city population hint");
    } else {
      const population = await wikidataService.getPopulationOfCity({
        city: vars.endingDetails.address.village,
      });
      vars.tryPushStep(
        "city population hint",
        !!population &&
          new CityPopulationHint({
            population,
            availableAt: vars.currentTime,
          }),
      );
    }
    vars.pushStep(
      new PotatoeChallenge({
        availableAt: vars.currentTime,
      }),
    );
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
  async _generatePhase2(vars: GlobalStepsVariables) {
    vars.tryPushStep(
      "state hint",
      !!vars.endingDetails &&
        new StateHint({
          stateLibelle: vars.endingDetails.address.state,
          availableAt: vars.currentTime,
        }),
    );
    vars.tryPushStep(
      "blason hint",
      !!vars.endingDepartement &&
        new BlasonHint({
          departementCode: vars.endingDepartement.code,
          availableAt: vars.currentTime,
        }),
    );
    vars.pushStep(
      new BlueCar5Challenge({
        availableAt: vars.currentTime,
      }),
    );
    vars.tryPushStep(
      "dish hint",
      !!vars.endingDetails &&
        new DishHint({
          state: vars.endingDetails.address.state,
          availableAt: vars.currentTime,
        }),
    );
    vars.tryPushStep(
      "rebus hint",
      !!vars.endingWikipediaPage &&
        new RebusHint({
          wikipediaPage: vars.endingWikipediaPage,
          availableAt: vars.currentTime,
        }),
    );
    vars.pushStep(
      new Toyota5Challenge({
        availableAt: vars.currentTime,
      }),
    );
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
  async _generatePhase3(vars: GlobalStepsVariables) {
    vars.tryPushStep(
      "departement hint",
      !!vars.endingDepartement &&
        new DepartementHint({
          departementLibelle: vars.endingDepartement.libelle,
          availableAt: vars.currentTime,
        }),
    );
    vars.pushStep(
      new CelebrityHint({
        endingPoint: vars.trip.endingPos,
        availableAt: vars.currentTime,
      }),
    );
    this._generateAttractionChallenge(vars);
    vars.tryPushStep(
      "precise description hint",
      !!vars.endingWikipediaPage &&
        new PreciseDescriptionHint({
          wikipediaPage: vars.endingWikipediaPage,
          availableAt: vars.currentTime,
        }),
    );
    vars.pushStep(
      new CompassDirectionHint({
        endingPoint: vars.trip.endingPos,
        startingPoint: vars.trip.startingPos,
        availableAt: vars.currentTime,
      }),
    );
    vars.pushStep(new ComplimentChallenge({ availableAt: vars.currentTime }));
  }

  /**
   * Generate hints and challenges of phase 4 :
   * - NearCityHint
   * - FuelStopChallenge,
   * - StateProductChallenge,
   * - ChangeWheelChallenge,
   * - PushCarChallenge
   *
   * @param variables global steps variables
   */
  async _generatePhase4(vars: GlobalStepsVariables) {
    this._generateNearCityHint(vars);
    vars.pushStep(
      new FuelStopChallenge({
        availableAt: vars.currentTime,
      }),
    );
    this._generateStateProductChallenge(vars);
    vars.pushStep(
      new ChangeWheelChallenge({
        availableAt: vars.currentTime,
      }),
    );
    vars.pushStep(new PushCarChallenge({ availableAt: vars.currentTime }));
  }

  /**
   * Generate the attraction challenge and put it into global steps variables
   * @param variables global steps variables
   * @returns void (challenge if created, is already added to steps in variables)
   */
  async _generateAttractionChallenge(
    vars: GlobalStepsVariables,
  ): Promise<void> {
    if (!!!vars.endingDepartement) {
      vars.logStepLack("attraction challenge");
      return;
    }
    const middlePoint = new GeoPoint({
      lat: (vars.trip.startingPos.lat + vars.trip.endingPos.lat) / 2,
      lon: (vars.trip.startingPos.lon + vars.trip.endingPos.lon) / 2,
    });
    const attractions = await googleMapsService.nearbySearch({
      keyword: "attractions",
      location: [middlePoint.lat, middlePoint.lon],
      radius: 15000,
    });
    vars.tryPushStep(
      "attraction challenge",
      !!attractions &&
        !!vars.endingDepartement &&
        new AttractionChallenge({
          rewardedHint: new BlasonHint({
            departementCode: vars.endingDepartement.code,
            availableAt: vars.currentTime,
          }).toDto(),
          attractions,
          availableAt: vars.currentTime,
        }),
    );
  }

  /**
   * Generate a near city hint and put it into global steps variables
   * @param variables global steps variables
   * @returns void (hint if created, is already added to steps in variables)
   */
  async _generateNearCityHint(vars: GlobalStepsVariables): Promise<void> {
    //faire un while autour du ending point (+-) 10km (puis 20, 30..etc) osm reverse jusqu'à trouver une adresse avec une autre city
    //TODO: generate near city hint
  }

  /**
   * Generate the state product challenge and put it into global steps variables
   * @param variables global steps variables
   * @returns void (challenge if created, is already added to steps in variables)
   */
  async _generateStateProductChallenge(
    vars: GlobalStepsVariables,
  ): Promise<void> {
    const celebrityHint = vars.steps.find((s) => s instanceof CelebrityHint);
    vars.tryPushStep(
      "state product challenge",
      !!vars.endingDetails &&
        new StateProductChallenge({
          stateLibelle: vars.endingDetails.address.state,
          rewardedHint: new CelebrityHint({
            endingPoint: vars.trip.endingPos,
            nearestFromPlace: !!celebrityHint
              ? celebrityHint.getOppositeMethod()
              : undefined,
            availableAt: vars.currentTime,
          }).toDto(),
          availableAt: vars.currentTime,
        }),
    );
  }
}

export default new StepsFactory();
