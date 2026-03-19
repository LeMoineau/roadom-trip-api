import { Request, Response, Router } from "express";
import tripRouter from "./trip.routes";
import osmService from "../services/osm.service";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { HGBDHint } from "../models/hints/HGBDHint.model";
import { ShoesHint } from "../models/hints/ShoesHint.model";
import { TourismHint } from "../models/hints/TourismHint.model";
import { FlagHint } from "../models/hints/FlagHint.model";
import { BlasonHint } from "../models/hints/BlasonHint.model";
import { departements } from "../constants/departements";
import { CelebrityHint } from "../models/hints/CelebrityHint.model";
import { CompassDirectionHint } from "../models/hints/CompassDirectionHint.model";
import { DishHint } from "../models/hints/DishHint.model";
import googleMapsService from "../services/google-maps.service";
import { AttractionChallenge } from "../models/challenges/AttractionChallenge.model";
import wikidataService from "../services/wikidata.service";
import wikipediaService from "../services/wikipedia.service";
import openWeatherService from "../services/open-weather.service";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("roadom-trip-api ready!");
});

router.use("/trips", tripRouter);

router.get("/test", async (_: Request, res: Response) => {
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

  const hint = new CelebrityHint({
    endingPoint: new GeoPoint({ lat: 44, lon: 2 }),
    nearestFromPlace: "birth",
    availableAt: new Date(),
  });
  res.send(hint.toDto());

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
});

export default router;
