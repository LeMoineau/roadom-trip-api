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
const express_1 = require("express");
const trip_routes_1 = __importDefault(require("./trip.routes"));
const osrm_service_1 = __importDefault(require("../services/osrm.service"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.send("roadom-trip-api ready!");
});
router.use("/trips", trip_routes_1.default);
router.get("/test", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // OSM Service
    // res.send(await osmService.search({ q: "13 Impasse andromaque" }));
    // res.send(await osmService.reverse({ lat: 48, lon: -1 }));
    // Hints
    // res.send(
    //   new HGBDHint({
    //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
    //     endingPos: new GeoPoint({ lat: 48.361407, lon: -3.644805 }),
    //     methodGenerationDirection: "from-starting-pos",
    //   }).toDto(),
    // );
    // res.send(
    //   new HGBDHint({
    //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
    //     endingPos: new GeoPoint({ lat: 44.361407, lon: 0.644805 }),
    //     methodGenerationDirection: "from-ending-pos",
    //   }).toDto(),
    // );
    // res.send(
    //   new HGBDHint({
    //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
    //     endingPos: new GeoPoint({ lat: 44.361407, lon: 0.644805 }),
    //   }).toDto(),
    // );
    // const hint = new ShoesHint({
    //   endingPos: new GeoPoint({ lat: 45.101288, lon: 5.844129 }),
    // });
    // await hint.init();
    // const hint = new TourismHint({
    //   endingDepartementCode: "69D",
    //   methodGenerationMessage: "most-popular-season",
    // });
    // const hint = new FlagHint({ departementCode: "69D" });
    // const hint = new BlasonHint({
    //   departementCode: "35",
    //   availableAt: new Date(),
    // });
    // const hint = new CelebrityHint({
    //   endingPoint: new GeoPoint({ lat: 44, lon: 2 }),
    //   nearestFromPlace: "birth",
    //   availableAt: new Date(),
    // });
    // res.send(hint.toDto());
    // const hint = new CompassDirectionHint({
    //   startingPoint: new GeoPoint({ lat: 49, lon: 2 }),
    //   endingPoint: new GeoPoint({ lat: 48, lon: 1 }),
    //   availableAt: new Date(),
    // });
    // const hint = new DishHint({
    //   state: "Centre",
    //   availableAt: new Date(),
    // });
    // const attractions = await googleMapsService.nearbySearch({
    //   keyword: "attractions",
    //   location: [44, -1],
    //   radius: 15000,
    // });
    // if (!!attractions) {
    //   const challenge = new AttractionChallenge({
    //     attractions,
    //     rewardedHint: hint.toDto(),
    //     availableAt: new Date(),
    //   });
    //   res.send(challenge.toDto());
    //   return;
    // }
    // res.send(hint.toDto());
    // const city = "Montigny-le-Bretonneux";
    // const t = await wikidataService.getPopulationOfCity({
    //   city,
    // });
    // res.send({ city, population: t });
    // const t = await wikipediaService.getFormattedPage({
    //   title: "Montigny-le-Bretonneux",
    // });
    // res.send(t);
    // res.send({
    //   message: "coucou les amis coucou je mange des galettes coucou hehe coucou"
    //     .split("coucou")
    //     .join("???"),
    // });
    // const t = await openWeatherService.getForecast({
    //   lat: 49,
    //   lon: -1,
    // });
    // res.send(t);
    // const routemaps = await googleMapsService.getRoute({
    //   origin: [48.1284314, -1.7529403],
    //   destination: [48.382117, -0.712761],
    // });
    // res.json(route);
    const route = yield osrm_service_1.default.getRoute({
        origin: [48.1284314, -1.7529403],
        destination: [48.382117, -0.712761],
    });
    res.json(route);
}));
exports.default = router;
