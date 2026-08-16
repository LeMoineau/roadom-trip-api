"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HGBDHint_model_1 = require("../models/hints/HGBDHint.model");
const ShoesHint_model_1 = require("../models/hints/ShoesHint.model");
const NoseChallenge_model_1 = require("../models/challenges/NoseChallenge.model");
const CelebrityHint_model_1 = require("../models/hints/CelebrityHint.model");
const PotatoeChallenge_model_1 = require("../models/challenges/PotatoeChallenge.model");
const StateHint_model_1 = require("../models/hints/StateHint.model");
const BlasonHint_model_1 = require("../models/hints/BlasonHint.model");
const Toyota5Challenge_model_1 = require("../models/challenges/Toyota5Challenge.model");
const DishHint_model_1 = require("../models/hints/DishHint.model");
const BlueCar5Challenge_model_1 = require("../models/challenges/BlueCar5Challenge.model");
const AttractionChallenge_model_1 = require("../models/challenges/AttractionChallenge.model");
const ComplimentChallenge_model_1 = require("../models/challenges/ComplimentChallenge.model");
const FuelStopChallenge_model_1 = require("../models/challenges/FuelStopChallenge.model");
const StateProductChallenge_model_1 = require("../models/challenges/StateProductChallenge.model");
const DepartementHint_model_1 = require("../models/hints/DepartementHint.model");
const TourismHint_model_1 = require("../models/hints/TourismHint.model");
const CompassDirectionHint_model_1 = require("../models/hints/CompassDirectionHint.model");
const departements_controller_1 = __importDefault(require("../controllers/departements.controller"));
const google_maps_service_1 = __importDefault(require("../services/google-maps.service"));
const GeoPoint_model_1 = require("../shared/models/GeoPoint.model");
const GlobalStepsVariables_1 = require("../utils/models/GlobalStepsVariables");
const wikidata_service_1 = __importDefault(require("../services/wikidata.service"));
const CityPopulationHint_model_1 = require("../models/hints/CityPopulationHint.model");
const wikipedia_service_1 = __importDefault(require("../services/wikipedia.service"));
const anonymise_wikipedia_page_1 = require("../utils/functions/anonymise-wikipedia-page");
const PreciseDescriptionHint_model_1 = require("../models/hints/PreciseDescriptionHint.model");
const RebusHint_model_1 = require("../models/hints/RebusHint.model");
const ChangeWheelChallenge_model_1 = require("../models/challenges/ChangeWheelChallenge.model");
const PushCarChallenge_model_1 = require("../models/challenges/PushCarChallenge.model");
const ProximityNotification_model_1 = require("../models/primitives/ProximityNotification.model");
class StepsFactory {
    /**
     * create new steps from a targeted trip
     * @param _trip targeted trip
     * @returns array of step for the targeted trip
     */
    create(_trip) {
        return __awaiter(this, void 0, void 0, function* () {
            const vars = yield this._calculateGlobalVariables(_trip);
            //TODO: pouvoir parametrer duree max qui peut limiter nombre de phase (par defaut 9h donc 3 phases)
            //TODO: pouvoir parametrer duree entre chaque etape (par defaut 30min)
            yield this._generatePhase1(vars);
            yield this._generatePhase2(vars);
            yield this._generatePhase3(vars);
            yield this._generatePhase4(vars);
            return vars.steps;
        });
    }
    /**
     * Calculate global variables for steps generation
     * @param trip target trip
     * @returns object of variables
     */
    _calculateGlobalVariables(trip) {
        return __awaiter(this, void 0, void 0, function* () {
            let endingDepartement;
            let endingWikipediaPage;
            if (!!trip.osmEndingDetails) {
                console.debug(`trip #${trip.id}: getting departement...`);
                endingDepartement = departements_controller_1.default.get({
                    name: trip.osmEndingDetails.address["ISO3166-2-lvl6"],
                    libelle: trip.osmEndingDetails.address.county,
                });
                console.debug(`trip #${trip.id}: getting departement done`);
                if (!!trip.osmEndingDetails.address.village) {
                    console.debug(`trip #${trip.id}: getting wikipedia page...`);
                    endingWikipediaPage = yield wikipedia_service_1.default.getFormattedPage({
                        title: trip.osmEndingDetails.address.village,
                    });
                    console.debug(`trip #${trip.id}: getting wikipedia page done`);
                    if (!!endingWikipediaPage) {
                        endingWikipediaPage = (0, anonymise_wikipedia_page_1.anonymiseWikipediaPage)(endingWikipediaPage, trip.osmEndingDetails.address.village);
                    }
                }
            }
            return new GlobalStepsVariables_1.GlobalStepsVariables({
                trip,
                endingDepartement,
                endingWikipediaPage,
            });
        });
    }
    /**
     * Generate hints and challenges of phase 1 :
     * - HGBDHint,
     * - ShoesHint,
     * - NoseChallenge,
     * - TourismHint,
     * - CityPopulationHint,
     * (? - WeatherHint)
     * - PotatoeChallenge,
     *
     * @param variables global steps variables
     */
    _generatePhase1(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            vars.pushStep(new ProximityNotification_model_1.ProximityNotification({ range: 400, availableAt: vars.currentTime }), { dontIncrementCurrentTime: true });
            vars.pushStep(new HGBDHint_model_1.HGBDHint({
                startingPos: vars.trip.startingPos,
                endingPos: vars.trip.endingPos,
                availableAt: vars.currentTime,
            }));
            vars.pushStep(new ShoesHint_model_1.ShoesHint({
                departementCode: (_a = vars.endingDepartement) === null || _a === void 0 ? void 0 : _a.code,
                availableAt: vars.currentTime,
            }));
            vars.pushStep(new NoseChallenge_model_1.NoseChallenge({
                availableAt: vars.currentTime,
            }));
            vars.tryPushStep("tourism hint", !!vars.endingDepartement &&
                new TourismHint_model_1.TourismHint({
                    endingDepartementCode: vars.endingDepartement.code,
                    availableAt: vars.currentTime,
                }));
            if (!!!((_b = vars.endingDetails) === null || _b === void 0 ? void 0 : _b.address.village)) {
                vars.logStepLack("city population hint");
            }
            else {
                console.debug(`trip #${vars.trip.id}: getting city population...`);
                const population = yield wikidata_service_1.default.getPopulationOfCity({
                    city: vars.endingDetails.address.village,
                });
                console.debug(`trip #${vars.trip.id}: getting city population done`);
                vars.tryPushStep("city population hint", !!population &&
                    new CityPopulationHint_model_1.CityPopulationHint({
                        population,
                        availableAt: vars.currentTime,
                    }));
            }
            vars.pushStep(new PotatoeChallenge_model_1.PotatoeChallenge({
                availableAt: vars.currentTime,
            }));
        });
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
    _generatePhase2(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            vars.pushStep(new ProximityNotification_model_1.ProximityNotification({ range: 100, availableAt: vars.currentTime }), { dontIncrementCurrentTime: true });
            vars.tryPushStep("state hint", !!((_a = vars.endingDetails) === null || _a === void 0 ? void 0 : _a.address.state) &&
                new StateHint_model_1.StateHint({
                    stateLibelle: vars.endingDetails.address.state,
                    availableAt: vars.currentTime,
                }));
            vars.tryPushStep("blason hint", !!vars.endingDepartement &&
                new BlasonHint_model_1.BlasonHint({
                    departementCode: vars.endingDepartement.code,
                    availableAt: vars.currentTime,
                }));
            vars.pushStep(new BlueCar5Challenge_model_1.BlueCar5Challenge({
                availableAt: vars.currentTime,
            }));
            vars.tryPushStep("dish hint", !!((_b = vars.endingDetails) === null || _b === void 0 ? void 0 : _b.address.state) &&
                new DishHint_model_1.DishHint({
                    state: vars.endingDetails.address.state,
                    availableAt: vars.currentTime,
                }));
            if (!!vars.endingWikipediaPage) {
                const rebusHint = new RebusHint_model_1.RebusHint({
                    wikipediaPage: vars.endingWikipediaPage,
                    availableAt: vars.currentTime,
                });
                yield rebusHint.generateRebus();
                vars.tryPushStep("rebus hint", rebusHint);
            }
            vars.pushStep(new Toyota5Challenge_model_1.Toyota5Challenge({
                availableAt: vars.currentTime,
            }));
        });
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
    _generatePhase3(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            vars.pushStep(new ProximityNotification_model_1.ProximityNotification({ range: 10, availableAt: vars.currentTime }), { dontIncrementCurrentTime: true });
            vars.tryPushStep("departement hint", !!vars.endingDepartement &&
                new DepartementHint_model_1.DepartementHint({
                    departementLibelle: vars.endingDepartement.libelle,
                    availableAt: vars.currentTime,
                }));
            vars.pushStep(new CelebrityHint_model_1.CelebrityHint({
                endingPoint: vars.trip.endingPos,
                availableAt: vars.currentTime,
            }));
            yield this._generateAttractionChallenge(vars);
            vars.tryPushStep("precise description hint", !!vars.endingWikipediaPage &&
                new PreciseDescriptionHint_model_1.PreciseDescriptionHint({
                    wikipediaPage: vars.endingWikipediaPage,
                    availableAt: vars.currentTime,
                }));
            vars.pushStep(new CompassDirectionHint_model_1.CompassDirectionHint({
                endingPoint: vars.trip.endingPos,
                startingPoint: vars.trip.startingPos,
                availableAt: vars.currentTime,
            }));
            vars.pushStep(new ComplimentChallenge_model_1.ComplimentChallenge({ availableAt: vars.currentTime }));
        });
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
    _generatePhase4(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            vars.pushStep(new ProximityNotification_model_1.ProximityNotification({ range: 1, availableAt: vars.currentTime }), { dontIncrementCurrentTime: true });
            this._generateNearCityHint(vars);
            vars.pushStep(new FuelStopChallenge_model_1.FuelStopChallenge({
                availableAt: vars.currentTime,
            }));
            this._generateStateProductChallenge(vars);
            vars.pushStep(new ChangeWheelChallenge_model_1.ChangeWheelChallenge({
                availableAt: vars.currentTime,
            }));
            vars.pushStep(new PushCarChallenge_model_1.PushCarChallenge({ availableAt: vars.currentTime }));
        });
    }
    /**
     * Generate the attraction challenge and put it into global steps variables
     * @param variables global steps variables
     * @returns void (challenge if created, is already added to steps in variables)
     */
    _generateAttractionChallenge(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!!vars.endingDepartement) {
                vars.logStepLack("attraction challenge");
                return;
            }
            const middlePoint = new GeoPoint_model_1.GeoPoint({
                lat: (vars.trip.startingPos.lat + vars.trip.endingPos.lat) / 2,
                lon: (vars.trip.startingPos.lon + vars.trip.endingPos.lon) / 2,
            });
            console.debug(`trip #${vars.trip.id}: getting google maps nearby attractions...`);
            const attractions = yield google_maps_service_1.default.nearbySearch({
                keyword: "attractions",
                location: [middlePoint.lat, middlePoint.lon],
                radius: 15000,
            });
            console.debug(`trip #${vars.trip.id}: getting google maps nearby attractions done`);
            vars.tryPushStep("attraction challenge", !!attractions &&
                !!vars.endingDepartement &&
                new AttractionChallenge_model_1.AttractionChallenge({
                    rewardedHint: new BlasonHint_model_1.BlasonHint({
                        departementCode: vars.endingDepartement.code,
                        availableAt: vars.currentTime,
                    }).toDto(),
                    attractions,
                    availableAt: vars.currentTime,
                }));
        });
    }
    /**
     * Generate a near city hint and put it into global steps variables
     * @param variables global steps variables
     * @returns void (hint if created, is already added to steps in variables)
     */
    _generateNearCityHint(vars) {
        return __awaiter(this, void 0, void 0, function* () {
            //faire un while autour du ending point (+-) 10km (puis 20, 30..etc) osm reverse jusqu'à trouver une adresse avec une autre city
            //TODO: generate near city hint
        });
    }
    /**
     * Generate the state product challenge and put it into global steps variables
     * @param variables global steps variables
     * @returns void (challenge if created, is already added to steps in variables)
     */
    _generateStateProductChallenge(vars) {
        var _a;
        const celebrityHint = vars.steps.find((s) => s instanceof CelebrityHint_model_1.CelebrityHint);
        vars.tryPushStep("state product challenge", !!((_a = vars.endingDetails) === null || _a === void 0 ? void 0 : _a.address.state) &&
            new StateProductChallenge_model_1.StateProductChallenge({
                stateLibelle: vars.endingDetails.address.state,
                rewardedHint: new CelebrityHint_model_1.CelebrityHint({
                    endingPoint: vars.trip.endingPos,
                    nearestFromPlace: !!celebrityHint
                        ? celebrityHint.getOppositeMethod()
                        : undefined,
                    availableAt: vars.currentTime,
                }).toDto(),
                availableAt: vars.currentTime,
            }));
    }
}
exports.default = new StepsFactory();
